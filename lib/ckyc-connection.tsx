import axios, { AxiosResponse } from 'axios';
import moment from '../lib/utils/moment';
import { crytoSignature } from '../lib/utils/crypto';
import {
  ML_AUTH_API_KEY,
  ML_AUTH_SECRET_KEY,
  ML_CKCYC_API_DOMAIN,
  ML_AUTH_SERVICE_API_DOMAIN,
} from "../lib/constants/common"
interface AuthResponse {
  data: {
    token: string
  }
}

interface CKYCSearchParams {
  ckycId?: string
  cellphoneNumber?: string
  firstName?: string
  lastName?: string
}

export interface CKYCSearchResponse {
  data: {
    data: unknown 
  }
}

class PartnersAPI {
  private cachedToken: { value: string; expiresAt: number } | null = null

  private async getToken(): Promise<string> {
    const now = Date.now()
    const currentDate = moment().format("YYYY-MM-DD")
    const passPhrase = `${ML_AUTH_API_KEY}|${ML_AUTH_SECRET_KEY}|${currentDate}`

    if (this.cachedToken && this.cachedToken.expiresAt > now) {
      return this.cachedToken.value
    }

    const signature = await crytoSignature(passPhrase)

    const response: AxiosResponse<AuthResponse> = await axios.post(
      ML_AUTH_SERVICE_API_DOMAIN,
      {
        apiKey: ML_AUTH_API_KEY,
        signature,
      },
      { timeout: 300000 }
    )

    this.cachedToken = {
      value: response.data.data.token,
      expiresAt: moment().endOf("day").valueOf(),
    }

    return this.cachedToken.value
  }

  private async getHeaders(): Promise<Record<string, string>> {
    const token = await this.getToken()
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  }

  public async exactSearchCKYC(
    params: CKYCSearchParams
  ): Promise<CKYCSearchResponse | string> {
    const {
      ckycId = "",
      cellphoneNumber = "",
      firstName = "",
      lastName = "",
    } = params

    try {
      const headers = await this.getHeaders()
      const queryParams = new URLSearchParams(
        Object.entries({ ckycId, cellphoneNumber, firstName, lastName })
          .filter(([_, value]) => value)
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
      )

      const response: AxiosResponse<CKYCSearchResponse> = await axios.get(
        `${ML_CKCYC_API_DOMAIN}/api/v1/customers/exact-search?${queryParams.toString()}`,
        { headers }
      )

      return response
    } catch (error) {
      return error instanceof Error
        ? error.message
        : "An unexpected error occurred"
    }
  }
}

export default PartnersAPI;