"use client";

import { useEffect, useState } from "react";

type Group = {
  id: string;
  name: string;
  description: string;
};

export default function GroupDetails({ groupId }: { groupId: string }) {
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGroupDetails() {
      try {
        const response = await fetch(`/api/groups/list?id=${groupId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch group details");
        }
        const data = await response.json();
        setGroup(data.groups[0]);
      } catch (error) {
        console.error("Error fetching group details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGroupDetails();
  }, [groupId]);

  if (loading) {
    return <div>Loading group details...</div>;
  }

  if (!group) {
    return <div>Group not found</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{group.name}</h1>
      <p className="text-gray-600 mb-6">{group.description}</p>
      {/* Add more group details, member list, games, etc. */}
    </div>
  );
}