import { useState } from "react";
import SearchSelect from "../Components/SearchAndSelect";
import { useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { loginRequest } from "../authConfig";

type User = {
  userId: number;
  empID: string;
  name: string;
  email: string;
};

type UserSearchProps = {
  onUserSelect: (user: User) => void;
};

export default function UserSearch({ onUserSelect,}: UserSearchProps) 
{
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);


  const { instance, accounts } = useMsal();

   const getAccessToken = async () => {
            const account = instance.getActiveAccount() ?? accounts[0];

            if (!account) {
                throw new Error("No logged-in Microsoft account found.");
            }

            try {
                const response = await instance.acquireTokenSilent({
                ...loginRequest,
                account,
                });

                return response.accessToken;
            } catch (error) {
                if (error instanceof InteractionRequiredAuthError) {
                await instance.acquireTokenRedirect({
                    ...loginRequest,
                    account,
                });

                return "";
                }

                throw error;
            }
};



  async function handleSearch(value: string)
   {
    
    setSearch(value);
    setSelectedUser(null);

    if (!value.trim()) {
      setUsers([]);
      return;
    }

    try {
      setLoading(true);

      const token = await getAccessToken();
      const response = await fetch(
        `/apiAuth/User/Search-Users?search=${encodeURIComponent(value)}`,
            { headers: {
                        Authorization: `Bearer ${token}`,
                        },
            }
        );

      if (!response.ok) {
        throw new Error("Failed to search users");
      }

      const data: User[] = await response.json();

      setUsers(data);

    } catch (error) {
      console.error(error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }

  function handleUserSelect(user: User) {
    setSelectedUser(user);
    setUsers([]);

    onUserSelect(user);
  }

    return (
    <>
    <div className="h-[20vh] w-[25vw]">

        <p className="m-2.5 block text-m font-medium text-[#111]">Select User</p>

        <SearchSelect
            placeholder="Search user..."
            results={users}
            loading={loading}
            getKey={(user) => user.userId}
            getLabel={(user) => `${user.name} - ${user.email} `}
            onSearch={handleSearch}
            onSelect={handleUserSelect}
        />
    </div>
        

    </>
    );
}