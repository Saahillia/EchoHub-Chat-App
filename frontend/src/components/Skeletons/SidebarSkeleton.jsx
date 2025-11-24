// Icon for the "Contacts" header, keeping skeleton consistent with real UI
import { Users } from "lucide-react";


// ======================================================================
// SidebarSkeleton Component
// Purpose:
// - Shown while the list of users is still loading from the backend
// - Uses placeholder skeletons to maintain layout structure
// - Helps prevent layout shifting and improves perceived performance
// ======================================================================
const SidebarSkeleton = () => {

    // Create 8 placeholder entries for skeleton contact list
    const skeletonContacts = Array(8).fill(null);

    return (
        <aside
            className="h-full w-20 lg:w-72 border-r border-base-300 
            flex flex-col transition-all duration-200"
        >

            {/* ================= Sidebar Header Skeleton ================= */}
            <div className="border-b border-base-300 w-full p-5">
                <div className="flex items-center gap-2">
                    {/* Icon (non-skeleton to maintain brand identity) */}
                    <Users className="w-6 h-6" />

                    {/* Title – hidden on small screens (matches real sidebar behavior) */}
                    <span className="font-medium hidden lg:block">Contacts</span>
                </div>
            </div>

            {/* ================= Skeleton Contact List ================= */}
            <div className="overflow-y-auto w-full py-3">
                {skeletonContacts.map((_, idx) => (
                    <div key={idx} className="w-full p-3 flex items-center gap-3">

                        {/* Avatar loading placeholder */}
                        <div className="relative mx-auto lg:mx-0">
                            <div className="skeleton size-12 rounded-full" />
                        </div>

                        {/* User name + status skeleton (visible only on large screens) */}
                        <div className="hidden lg:block text-left min-w-0 flex-1">
                            <div className="skeleton h-4 w-32 mb-2" /> {/* name */}
                            <div className="skeleton h-3 w-16" />     {/* online/offline */}
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default SidebarSkeleton;
