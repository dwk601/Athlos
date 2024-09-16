"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Group = {
  id: string;
  name: string;
  description: string;
};

export default function GroupList() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGroups() {
      try {
        const response = await fetch("/api/groups/list");
        if (!response.ok) {
          throw new Error("Failed to fetch groups");
        }
        const data = await response.json();
        setGroups(data.groups || []);
      } catch (error) {
        console.error("Error fetching groups:", error);
        setError("Failed to load groups. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchGroups();
  }, []);

  if (loading) {
    return <div>Loading groups...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (groups.length === 0) {
    return <div>No groups found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {groups.map((group) => (
        <Link href={`/groups/${group.id}`} key={group.id}>
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{group.name}</h2>
            <p className="text-gray-600">{group.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}