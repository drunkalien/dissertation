import { useAPIMutation, useAPIQuery, useCurrentUser } from "@/hooks";
import { User } from "@/models";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DeleteButton = ({ userId }: { userId: number }) => {
  const query = useAPIQuery<{ users: User[] }>({ url: "users/" });
  const mutation = useAPIMutation({
    url: `users/${userId}`,
    method: "DELETE",
    options: {
      onSuccess: () => {
        query.refetch();
      },
    },
  });

  function handleDelete() {
    mutation.mutate({});
  }

  return (
    <button
      className="bg-red-500 text-white rounded p-2"
      onClick={handleDelete}
    >
      Delete
    </button>
  );
};

const Users = () => {
  const query = useAPIQuery<{ users: User[] }>({ url: "users/" });
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const currentUserQuery = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (currentUserQuery.data?.user) {
      setCurrentUser(currentUserQuery.data.user);
    }
  }, [currentUserQuery]);

  return (
    <div className="flex items-center flex-col">
      <h3 className="font-semibold text-2xl pb-4">Users</h3>
      {query.isLoading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-7/12">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 text-start">
                #
              </th>
              <th scope="col" className="px-6 py-3 text-start">
                Username
              </th>
              <th scope="col" className="px-6 py-3 text-start">
                Role
              </th>
              <th scope="col" className="px-6 py-3 text-start">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {query.data?.users.map((user, index) => {
              return (
                <tr
                  className="cursor-pointer"
                  key={index}
                  onClick={() => router.push("/user/" + user.id)}
                >
                  <td scope="col" className="px-6 py-3">
                    {index + 1}
                  </td>
                  <td scope="col" className="px-6 py-3">
                    {user.username}
                  </td>
                  <td scope="col" className="px-6 py-3">
                    {user.role === 0 ? "Admin" : "User"}
                  </td>
                  <td scope="col" className="px-6 py-3">
                    {currentUser?.id === user.id ? (
                      <span className="text-blue-700">You</span>
                    ) : (
                      <DeleteButton userId={user.id} />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <div></div>
    </div>
  );
};

export default Users;
