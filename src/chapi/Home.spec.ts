import { describe, it, expect } from "vitest";
import { HttpClient } from "../HttpClient";
import { ApiService } from "../ApiService";
import { HomeOperation } from "./Home";
import { buildClient } from "fetch-chain";

describe("Home", () => {
  let httpClient: HttpClient;
  let apiService: ApiService;

  beforeAll(() => {
    httpClient = {
      fetch: (request: RequestInfo | URL, init?: RequestInit) =>
        buildClient()
          .baseURL("https://chapi.sooplive.co.kr")
          .build()
          .fetch(request, init),
    };
    apiService = new ApiService(httpClient);
  });
  describe("Home API 테스트", () => {
    it("실제 홈 데이터를 가져와야 합니다", async () => {
      const homeOperation = apiService["createOperation"](HomeOperation);
      const result = await homeOperation({ user_id: "rud9281" });

      // 응답 구조 검증
      expect(result).toHaveProperty("vods");
      expect(result).toHaveProperty("boards");
      expect(result).toHaveProperty("user_vods");
      expect(result).toHaveProperty("user_boards");
      expect(result).toHaveProperty("catchstorys");
      expect(result).toHaveProperty("playlists");
      expect(result).toHaveProperty("sooptore");
      expect(result).toHaveProperty("banners");
      expect(result).toHaveProperty("is_adsence");
      expect(result).toHaveProperty("adballoon_event");

      // 데이터 타입 검증
      expect(Array.isArray(result.vods)).toBe(true);
      expect(Array.isArray(result.boards)).toBe(true);
      expect(Array.isArray(result.user_vods)).toBe(true);
      expect(Array.isArray(result.user_boards)).toBe(true);
      expect(typeof result.is_adsence).toBe("boolean");

      // adballoon_event 객체 구조 검증
      expect(result.adballoon_event).toHaveProperty("end_yn");
      expect(result.adballoon_event).toHaveProperty("percent");
      expect(typeof result.adballoon_event.end_yn).toBe("boolean");
      expect(typeof result.adballoon_event.percent).toBe("number");
    });
  });
});
