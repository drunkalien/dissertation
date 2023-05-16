import { useAPIQuery } from "@/hooks";
import { User } from "@/models";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const User = () => {
  const router = useRouter();
  const { id } = router.query;
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (id) {
      setUserId(id as string);
    }
  }, [id]);

  const userQuery = useAPIQuery<{ user: User }>({
    url: "users/" + userId,
  });

  console.log(userQuery);

  return <div>User</div>;
};

export default User;
