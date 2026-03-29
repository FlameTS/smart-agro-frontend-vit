import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import { User, Mail, Calendar } from "lucide-react";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { user, loading, signOut } = useAuth();

  // Redirect to home if not logged in
  if (!loading && !user) {
    return <Navigate to="/" replace />;
  }

  if (loading || !user) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  const email = user?.email || "No Email Provided";
  const user_metadata = user?.user_metadata || {};
  const created_at = user?.created_at;
  
  const fullName = user_metadata.full_name || user_metadata.name || email.split("@")[0] || "Unknown User";
  const avatarUrl = user_metadata.avatar_url || user_metadata.picture || null;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
          <p className="text-muted-foreground mt-2">Manage your account information and view details.</p>
        </div>

        <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
          {/* Profile Header */}
          <div className="bg-primary/5 px-6 py-8 sm:px-10 sm:py-10 flex flex-col sm:flex-row items-center gap-6">
            {avatarUrl ? (
              <img 
                src={avatarUrl} 
                alt={fullName} 
                className="h-24 w-24 rounded-full border-4 border-white shadow-md object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/20 text-primary border-4 border-white shadow-md">
                <User className="h-10 w-10" />
              </div>
            )}
            
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold">{fullName}</h2>
              <p className="flex items-center justify-center sm:justify-start gap-1.5 text-muted-foreground mt-1">
                <Mail className="h-4 w-4" />
                {email}
              </p>
            </div>
          </div>

          {/* Account Details */}
          <div className="px-6 py-6 sm:px-10">
            <h3 className="text-lg font-semibold mb-4 border-b pb-2">Account Details</h3>
            
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-muted-foreground">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Member Since</p>
                  <p className="text-sm text-muted-foreground">
                    {created_at ? new Date(created_at).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    }) : "Unknown"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-muted-foreground">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">User ID</p>
                  <p className="text-sm text-muted-foreground font-mono truncate max-w-[200px]" title={user.id}>
                    {user.id}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-center sm:justify-start">
              <button
                onClick={signOut}
                className="rounded-md bg-red-50 text-red-600 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-red-100 border border-red-200"
              >
                Sign out of my account
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
