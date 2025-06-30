import crypto from 'crypto';
import axios, { AxiosResponse } from 'axios';
import moment from '../lib/utils/moment';
import { crytoSignature } from '../lib/utils/crypto';
import {
  ML_AUTH_API_KEY,
  ML_AUTH_SECRET_KEY,
  ML_CKCYC_API_DOMAIN,
  ML_AUTH_SERVICE_API_DOMAIN,
  ML_DOMESTIC_API_BASE_URL,
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
    data: unknown // Replace `unknown` with the actual shape if known
  }
}

export interface TransactionHistoryResponse {
  data: {
    data: any[]
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
      console.log('adasdasdasdasdasdsd')
      const headers = await this.getHeaders()
      const queryParams = new URLSearchParams(
        Object.entries({ ckycId, cellphoneNumber, firstName, lastName })
          .filter(([_, value]) => value) // Remove empty params
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
      )

      const response: AxiosResponse<CKYCSearchResponse> = await axios.get(
        `${ML_CKCYC_API_DOMAIN}/customers/exact-search?${queryParams.toString()}`,
        { headers }
      )

      return response
    } catch (error) {
      return error instanceof Error
        ? error.message
        : "An unexpected error occurred"
    }
  }

  public async getTransactionHistory(
    searchParams: URLSearchParams,
    ckycId: string
  ): Promise<TransactionHistoryResponse[] | string> {
    try {
      const headers = await this.getHeaders()

      const response: AxiosResponse<TransactionHistoryResponse[]> =
        await axios.get(
          `${ML_DOMESTIC_API_BASE_URL}/2.0/ml-money/transaction-history/${ckycId}?${searchParams}`,
          { headers }
        )

      return response.data
    } catch (error) {
      return error instanceof Error
        ? error.message
        : "An unexpected error occurred"
    }
  }
}

export default PartnersAPI;