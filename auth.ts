import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";

if (!process.env.AUTH_GITHUB_ID || !process.env.AUTH_GITHUB_SECRET) {
  throw new Error('GitHub OAuth environment variables are not set');
}

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) {
  throw new Error('Sanity environment variables are not set');
}

console.log('Initializing NextAuth with config...');
console.log('GitHub Client ID exists:', !!process.env.AUTH_GITHUB_ID);
console.log('GitHub Client Secret exists:', !!process.env.AUTH_GITHUB_SECRET);
console.log('Sanity Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
console.log('Sanity Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET);

const config = {
  debug: process.env.NODE_ENV === 'development',
  logger: {
    error(code: string, metadata: any) {
      console.error('NextAuth Error:', { code, metadata });
    },
    warn(code: string) {
      console.warn('NextAuth Warning:', code);
    },
    debug(code: string, metadata: any) {
      console.log('NextAuth Debug:', { code, metadata });
    }
  },
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
      authorization: {
        params: {
          scope: 'read:user user:email'
        }
      },
      profile(profile) {
        console.log('GitHub Profile:', profile);
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          login: profile.login
        };
      }
    }),
  ],

  callbacks: {
    async signIn({ user, profile }: { 
      user: { name?: string | null; email?: string | null; image?: string | null };
      profile?: { id: string; login: string; bio?: string };
    }) {  
      try {
        console.log('SignIn attempt with profile:', { profileId: profile?.id, email: user.email });
        
        if (!profile?.id) {
          console.error('❌ No profile ID found');
          return false;
        }

        const { name, email, image } = user;  
        const existingUser = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: profile.id,
        }).catch(error => {
          console.error('❌ Error fetching user from Sanity:', error);
          throw error;
        });

        if (!existingUser) {
          console.log('Creating new user in Sanity');
          try {
            await writeClient.create({
              _type: "author",
              _id: `author.${profile.id}`,
              id: profile.id,
              name: name || profile.login,
              username: profile.login,
              email: email || `${profile.login}@users.noreply.github.com`,
              image,
              bio: profile?.bio || "",
            });
            console.log('✅ Successfully created new user');
          } catch (createError) {
            console.error('❌ Error creating user in Sanity:', createError);
            throw createError;
          }
        }

        return true;
      } catch (error) {
        console.error("❌ Error in signIn callback:", error);
        return false;
      }
    },

    async jwt({ token, account, profile }: {
      token: any;
      account?: any;
      profile?: { id: string };
    }) {
      if (account && profile) {
        const user = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: profile.id,
        });
        token.id = user._id;
      }
      return token;
    },

    async session({ session, token }: {
      session: any;
      token: { id?: string };
    }) {
      if (token.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = (NextAuth as any)(config);
