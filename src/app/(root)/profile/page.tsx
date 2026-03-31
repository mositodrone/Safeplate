import { auth } from "@clerk/nextjs/server";
import { Heart } from "lucide-react";
import Image from "next/image";

import { ArrowUpRight } from "lucide-react";
import { redirect } from "next/navigation";

// import { Collection } from "@/components/shared/Collection";
import Header from "@/components/shared/Header";
// import { getUserImages } from "@/lib/actions/image.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { connectDB } from "@/lib/db";
import { recentScans, savedItems } from "@/constants";
import { GetUserScans, GetUserScanStats } from "@/lib/actions/scan.actions";
import SavedScanDialog from "@/components/shared/SavedScanDialog";
import ProfileComponent from "@/components/shared/ProfileComponent";
import { connectToDatabase } from "@/lib/database/mongoose";

const Profile = async () => {  
  await connectToDatabase();  
  // const page = Number(searchParams?.page) || 1;
  const { userId } = await auth();
  console.log(userId) 

  if (!userId) redirect("/sign-in");
  await connectDB();

  const user = await getUserById(userId);
  const scans = await GetUserScans(userId);
  const scanAmount = await GetUserScanStats(userId);

  const { total, safe, risky } = scanAmount;
  console.log("saved:", scans)
  // const images = await getUserImages({ page, userId: user._id });

  return (
    <>
      <div className="min-h-screen bg-[#04020a] p-6 md:p-10">
        <div className="max-w-5xl mx-auto space-y-8">
           {/* Top Branding */}
          <div className="text-center text-xl font-semibold tracking-wide">
            MyPlate
          </div>

          {/* Welcome Section */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Welcome</p>
              <h1 className="text-3xl md:text-4xl font-bold">
                {user?.firstName}
              </h1>
            </div>

            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image
                src={user?.photo}
                alt="User"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Impact Card */}
          <div className="relative bg-gradient-to-r from-emerald-700 to-emerald-500 rounded-2xl p-6 md:p-8 text-white overflow-hidden shadow-lg">
            
            <p className="text-sm opacity-90">Scans You've Saved</p>

            <div className="flex items-center gap-3 mt-2">
              <div className="bg-white/20 p-2 rounded-full">
                <Heart className="w-5 h-5" />
              </div>
              <span className="text-4xl md:text-5xl font-bold">{total}</span>
            </div>

            {/* Decorative image placeholder */}
            <div className="absolute right-4 bottom-0 w-40 h-32 opacity-20">
              <Image
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=400"
                alt="Decorative"
                fill
                className="object-cover rounded-xl"
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="bg-black rounded-2xl p-5 shadow-sm border">
              <p className="text-sm text-gray-500">
                Your Safe Count
              </p>
              <h3 className="text-2xl font-semibold mt-2">
                {safe}
              </h3>
            </div>

            <div className="bg-black rounded-2xl p-5 shadow-sm border">
              <p className="text-sm text-gray-500">
                Your Risk Count
              </p>
              <h3 className="text-2xl font-semibold mt-2">
                {risky}
              </h3>
            </div>

          </div>
          
          {/* Recent Topics */}
          <div className="bg-black rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Recent Scans</h2>

            <div className="flex flex-wrap gap-3">
              {recentScans.map((topic) => (
                <span
                  key={topic}
                  className="px-4 py-1.5 text-sm rounded-full bg-black hover:bg-gray-200  hover:text-black transition cursor-pointer"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Saved Items */}
          <div className="bg-black rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-6">Saved Items</h2>
            <ProfileComponent scans={scans}/>            
          </div>

        </div>
      </div>
    </>
  );
};

export default Profile;