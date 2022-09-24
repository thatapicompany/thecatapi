import nock from "nock";
import TheCatAPI from "../../index";
import * as Stream from "stream";

const imagesResponse = [
  {
    breeds: [],
    categories: [],
    id: "eeb",
    url: "https://cdn2.thecatapi.com/images/eeb.jpg",
    width: 400,
    height: 267,
    sub_id: "USR123",
  },
  {
    breeds: [],
    categories: [
      {
        id: 1,
        name: "funny",
      },
    ],
    id: "MTg3MjE2OQ",
    url: "https://cdn2.thecatapi.com/images/MTg3MjE2OQ.jpg",
    width: 2048,
    height: 1356,
  },
  {
    breeds: [
      {
        id: "bure",
        name: "Burmese",
      },
    ],
    categories: [],
    id: "92D9NZLs0",
    url: "https://cdn2.thecatapi.com/images/92D9NZLs0.jpg",
    width: 3260,
    height: 1685,
  },
  {
    breeds: [
      {
        id: "abys",
        name: "Abyssinian",
      },
    ],
    categories: [],
    id: "p6x60nX6U",
    url: "https://cdn2.thecatapi.com/images/p6x60nX6U.jpg",
    width: 1032,
    height: 774,
  },
];

describe("Images", function () {
  let theCatAPI: TheCatAPI;

  beforeAll(() => {
    theCatAPI = new TheCatAPI("my-api-key");
  });

  describe("getImages", () => {
    it("should fetch images", async () => {
      const response = imagesResponse[0];
      nock("https://api.thecatapi.com/v1/images")
        .get("/search")
        .reply(200, response);
      const images = await theCatAPI.images.getImages();
      expect(images).toEqual(response);
    });

    it("should fetch images using limit", async () => {
      const response = imagesResponse.slice(0, 2);
      nock("https://api.thecatapi.com/v1/images")
        .get("/search")
        .query({ limit: /^\d+$/ })
        .reply(200, response);
      const images = await theCatAPI.images.getImages({
        limit: 2,
      });
      expect(images).toEqual(response);
    });

    it("should fetch images filtered by hasBreeds", async () => {
      const response = imagesResponse.filter((x) => !!x.breeds);
      nock("https://api.thecatapi.com/v1/images")
        .get("/search")
        .query({ has_breeds: 1 })
        .reply(200, response);
      const images = await theCatAPI.images.getImages({
        hasBreeds: true,
      });
      expect(images).toEqual(response);
    });

    it("should fetch images filtered by breeds", async () => {
      const response = imagesResponse.filter(
        (x) => x.breeds.length > 0 && x.breeds[0].name === "abys"
      );
      nock("https://api.thecatapi.com/v1/images")
        .get("/search")
        .query({ breed_ids: "abys" })
        .reply(200, response);
      const images = await theCatAPI.images.getImages({
        breeds: ["abys"],
      });
      expect(images).toEqual(response);
    });

    it("should fetch images filtered by categories", async () => {
      const response = imagesResponse.filter(
        (x) => x.categories.length > 0 && x.categories[0].id === 1
      );
      nock("https://api.thecatapi.com/v1/images")
        .get("/search")
        .query({ category_ids: 1 })
        .reply(200, response);
      const images = await theCatAPI.images.getImages({
        categories: [1],
      });
      expect(images).toEqual(response);
    });

    it("should fetch images filtered by sub_id", async () => {
      const response = imagesResponse.filter((x) => x.sub_id === "USR123");
      nock("https://api.thecatapi.com/v1/images")
        .get("/search")
        .query({ sub_id: "USR123" })
        .reply(200, response);
      const images = await theCatAPI.images.getImages({
        subId: "USR123",
      });
      expect(images).toEqual(response);
    });

    it("should fetch images filtered by mime type", async () => {
      const response = imagesResponse[0];
      nock("https://api.thecatapi.com/v1/images")
        .get("/search")
        .query({ mime_types: "jpg,png" })
        .reply(200, response);
      const images = await theCatAPI.images.getImages({
        mimeTypes: ["jpg", "png"],
      });
      expect(images).toEqual(response);
    });

    it("should fetch images filtered by format", async () => {
      const response = imagesResponse[0];
      nock("https://api.thecatapi.com/v1/images")
        .get("/search")
        .query({ format: "src" })
        .reply(200, response);
      const images = await theCatAPI.images.getImages({
        format: "src",
      });
      expect(images).toEqual(response);
    });

    it("should fetch images with pagination", async () => {
      const response = imagesResponse;
      nock("https://api.thecatapi.com/v1/images")
        .get("/search")
        .query({ page: 1, order: "ASC" })
        .reply(200, response);
      const images = await theCatAPI.images.getImages({
        page: 1,
        order: "ASC",
      });
      expect(images).toEqual(response);
    });

    it("should fetch images in descending order", async () => {
      const response = imagesResponse;
      nock("https://api.thecatapi.com/v1/images")
        .get("/search")
        .query({ order: "DESC" })
        .reply(200, response);
      const images = await theCatAPI.images.getImages({
        order: "DESC",
      });
      expect(images).toEqual(response);
    });

    it("should fetch images with all filters", async () => {
      const response = imagesResponse;
      nock("https://api.thecatapi.com/v1/images")
        .get("/search")
        .query({
          limit: 3,
          category_ids: 1,
          breed_ids: "abys",
          format: "json",
          order: "ASC",
          page: 1,
          sub_id: "USR123",
          mime_types: "jpg",
          has_breeds: 1,
          size: "med",
        })
        .reply(200, response);
      const images = await theCatAPI.images.getImages({
        limit: 3,
        categories: [1],
        breeds: ["abys"],
        format: "json",
        order: "ASC",
        page: 1,
        subId: "USR123",
        mimeTypes: ["jpg"],
        hasBreeds: true,
        size: "med",
      });
      expect(images).toEqual(response);
    });
  });

  describe("getImage", function () {
    it("should fetch an image", async () => {
      const response = imagesResponse[0];
      nock("https://api.thecatapi.com/v1/images")
        .get(`/${response.id}`)
        .reply(200, response);
      const image = await theCatAPI.images.getImage(response.id);
      expect(image).toEqual(response);
    });
  });

  describe("getRandomImage", function () {
    it("should fetch a random image", async () => {
      const response = [imagesResponse[0]];
      nock("https://api.thecatapi.com/v1/images")
        .get("/search")
        .reply(200, response);
      const image = await theCatAPI.images.getRandomImage();
      expect(image).toEqual(response[0]);
    });
    it("should fetch a random image with filters", async () => {
      const response = [imagesResponse[0]];
      nock("https://api.thecatapi.com/v1/images")
        .get("/search")
        .query({
          has_breeds: 1,
          breed_ids: "abys",
          category_ids: 1,
          format: "json",
          size: "small",
          mime_types: "jpg,png",
        })
        .reply(200, response);
      const image = await theCatAPI.images.getRandomImage({
        hasBreeds: true,
        breeds: ["abys"],
        categories: [1],
        format: "json",
        size: "small",
        mimeTypes: ["jpg", "png"],
      });
      expect(image).toEqual(response[0]);
    });
    it("should return null if no image was found", async () => {
      nock("https://api.thecatapi.com/v1/images").get("/search").reply(200, []);
      const image = await theCatAPI.images.getRandomImage();
      expect(image).toBeNull();
    });
  });

  describe("uploadImage", function () {
    it("should upload an image", async () => {
      const response = {
        id: "coDBFem0P",
        url: "https://cdn2.thecatapi.com/images/coDBFem0P.jpg",
        width: 1920,
        height: 1271,
        original_filename: "cat-1373446292aWW.jpg",
        pending: 0,
        approved: 1,
      };
      nock("https://api.thecatapi.com/v1/images")
        .post("/upload")
        .reply(201, response);
      const readableStream = Stream.Readable.from(["test"]);
      // this doesn't test whether we're actually sending the file or not
      const uploadedImage = await theCatAPI.images.uploadImage(readableStream);
      expect(uploadedImage).toEqual(response);
    });
    it("should upload an image with subId", async () => {
      const response = {
        id: "coDBFem0P",
        url: "https://cdn2.thecatapi.com/images/coDBFem0P.jpg",
        width: 1920,
        height: 1271,
        original_filename: "cat-1373446292aWW.jpg",
        pending: 0,
        approved: 1,
        sub_id: "test_subId",
      };
      nock("https://api.thecatapi.com/v1/images")
        .post("/upload")
        .reply(201, response);
      const readableStream = Stream.Readable.from(["test"]);
      // this doesn't test whether we're actually sending the file or not
      const uploadedImage = await theCatAPI.images.uploadImage(
        readableStream,
        response.sub_id
      );
      expect(uploadedImage).toEqual(response);
    }, 20000);
  });
});
