import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Unlock, Check, X, Fingerprint, UserCheck, Settings, BookOpen, ShoppingCart, Database, AlertCircle } from 'lucide-react';
import { User, UserRole } from '../types';

interface RoleOverviewWidgetProps {
  currentUser: User | null;
}

interface PermissionItem {
  name: string;
  description: string;
  status: 'allowed' | 'restricted' | 'locked';
}

export default function RoleOverviewWidget({ currentUser }: RoleOverviewWidgetProps) {
  const currentRole: UserRole = currentUser?.role || 'Customer';

  // Role permissions detail definitions
  const roleMetadata = {
    Admin: {
      clearanceScore: 100,
      title: 'Root Administrator',
      description: 'You have full, unrestricted database access and write clearances across all business units.',
      colorClass: 'bg-rose-550 border-rose-200 text-rose-700 bg-rose-50/50 shadow-rose-500/10',
      badgeBg: 'bg-rose-100 text-rose-800 border-rose-200',
      permissions: [
        { name: 'User Access Control', description: 'Modify and change clearance level of registered members', status: 'allowed' },
        { name: 'System Settings', description: 'Alter the core parameters of the VISTA enterprise portal', status: 'allowed' },
        { name: 'Publish Courses, Products & Blogs', description: 'Full create, update, and delete capability', status: 'allowed' },
        { name: 'Google Workspace Sync', description: 'Sync database records to Sheets and email inquiries', status: 'allowed' },
      ] as PermissionItem[],
    },
    Staff: {
      clearanceScore: 75,
      title: 'Content Publisher',
      description: 'You can publish courses, catalog products, write blog articles, and coordinate customer inquiries.',
      colorClass: 'bg-violet-550 border-violet-200 text-violet-700 bg-violet-50/50 shadow-violet-500/10',
      badgeBg: 'bg-violet-100 text-violet-800 border-violet-200',
      permissions: [
        { name: 'Publish Courses, Products & Blogs', description: 'Add, update, or remove entries in respective sections', status: 'allowed' },
        { name: 'Inbox Coordination', description: 'Access leads list and mark them as contacted', status: 'allowed' },
        { name: 'Google Workspace Sync', description: 'View current document sheets', status: 'restricted' },
        { name: 'User Access Control', description: 'Database restriction on user profile role modification', status: 'locked' },
      ] as PermissionItem[],
    },
    Student: {
      clearanceScore: 50,
      title: 'Academic Member',
      description: 'You can register for professional courses and access study curricula.',
      colorClass: 'bg-emerald-550 border-emerald-200 text-emerald-700 bg-emerald-50/50 shadow-emerald-500/10',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      permissions: [
        { name: 'Course Registrations', description: 'Register, track registration logs, and access syllabus', status: 'allowed' },
        { name: 'Product Store', description: 'Browse and purchase computing assets', status: 'allowed' },
        { name: 'Inbox Coordination', description: 'Restricted view of other customer requests', status: 'locked' },
        { name: 'Publish Courses, Products & Blogs', description: 'No creation permissions in curriculum modules', status: 'locked' },
      ] as PermissionItem[],
    },
    Customer: {
      clearanceScore: 25,
      title: 'Public Client',
      description: 'You can explore our hardware showcase catalog, submit custom inquiries, and browse articles.',
      colorClass: 'bg-blue-550 border-blue-200 text-blue-700 bg-blue-50/50 shadow-blue-500/10',
      badgeBg: 'bg-blue-100 text-blue-800 border-blue-200',
      permissions: [
        { name: 'Product Showroom & Cart', description: 'Add hardware to cart and simulate purchases', status: 'allowed' },
        { name: 'Inquiry Tickets', description: 'Send contact messages or quote requests directly to staff', status: 'allowed' },
        { name: 'Course Registrations', description: 'View courses, must sign up to request enrollment', status: 'restricted' },
        { name: 'System Settings', description: 'Restricted backend operations', status: 'locked' },
      ] as PermissionItem[],
    },
  };

  const meta = roleMetadata[currentRole] || roleMetadata.Customer;

  return (
    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 md:p-6 shadow-sm overflow-hidden text-left relative">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Shield className="w-24 h-24 text-slate-400 stroke-[1.5]" />
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-150 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className={`text-[9px] uppercase font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full border ${meta.badgeBg}`}>
              {currentRole} Access
            </span>
            <span className="text-slate-400 font-mono text-[10px]">Role ID: r_vista_{currentRole.toLowerCase()}</span>
          </div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center space-x-2">
            <Fingerprint className="w-5 h-5 text-slate-700 shrink-0" />
            <span>Role Access Clearances: {meta.title}</span>
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xl">{meta.description}</p>
        </div>

        {/* Dynamic visual indicator - Ring or Segment gauge */}
        <div className="flex items-center space-x-3 bg-white px-4 py-3 border border-slate-150 rounded-xl shadow-sm shrink-0">
          <div className="relative w-12 h-12 flex items-center justify-center">
            {/* SVG circular track */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="20"
                className="stroke-slate-100"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                className={`transition-all duration-1000 ${
                  currentRole === 'Admin' ? 'stroke-rose-500' :
                  currentRole === 'Staff' ? 'stroke-violet-500' :
                  currentRole === 'Student' ? 'stroke-emerald-500' :
                  'stroke-blue-500'
                }`}
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 20}`}
                strokeDashoffset={`${2 * Math.PI * 20 * (1 - meta.clearanceScore / 100)}`}
              />
            </svg>
            <span className="absolute text-xs font-black text-slate-800">{meta.clearanceScore}%</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold block leading-none uppercase tracking-wider">Security clearance</span>
            <span className="text-xs font-black text-slate-800 mt-1 block">Level {meta.clearanceScore / 25} clearance</span>
          </div>
        </div>
      </div>

      {/* Permissions Grid */}
      <div className="mt-5 relative z-10">
        <h4 className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold mb-3.5">Assigned Policy Definitions</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {meta.permissions.map((perm, idx) => (
            <div key={idx} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-150">
              <div className="shrink-0 mt-0.5">
                {perm.status === 'allowed' && (
                  <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-full p-1">
                    <Unlock className="w-3.5 h-3.5" />
                  </div>
                )}
                {perm.status === 'restricted' && (
                  <div className="bg-amber-50 border border-amber-100 text-amber-600 rounded-full p-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                  </div>
                )}
                {perm.status === 'locked' && (
                  <div className="bg-slate-100 border border-slate-200 text-slate-400 rounded-full p-1">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
              <div className="space-y-0.5 text-xs text-left">
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-slate-900">{perm.name}</span>
                  <span className={`text-[8px] font-bold px-1.5 py-0.2 rounded uppercase ${
                    perm.status === 'allowed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                    perm.status === 'restricted' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                    'bg-slate-100 text-slate-500'
                  }`}>
                    {perm.status}
                  </span>
                </div>
                <p className="text-[10px] text-slate-450 leading-relaxed">{perm.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Access system notice */}
      <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-slate-400 bg-slate-100 px-4 py-2 rounded-lg">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          Cross-cutting RBAC validation enforced on and server-side APIs.
        </span>
        <span>Secure Core</span>
      </div>
    </div>
  );
}
