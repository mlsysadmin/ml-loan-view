import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { isMobileNumber } from "../../../../lib/utils/common";
import { ML_CKCYC_API_DOMAIN } from "../../../../lib/constants/common";

export interface CKYCData {
  id: string
  name: string
  dob: string
  [key: string]: any
}

export function useSearchCKYC(
  searchText: string
): UseQueryResult<CKYCData | null> {
  return useQuery<CKYCData | null>({
    queryKey: ["search", searchText],
    queryFn: async () => {
      if (isMobileNumber(searchText)) {
        const res = await axios.get<CKYCData>(
          `/api/ckyc?cellphoneNumber=${searchText}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer ", // Set proper token here
            },
            timeout: 300000,
          }
        )

        return res.data.data
      }

      return null
    },
    enabled: isMobileNumber(searchText),
    refetchOnWindowFocus: false,
  })
}

