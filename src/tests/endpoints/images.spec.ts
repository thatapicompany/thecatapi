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

  describe("searchImages", () => {
    it("should fetch images", async () => {
      const response = imagesResponse[0];
      nock("https://api.thecatapi.com/v1/images")
        .get("/search")
        .reply(200, response);
      const images = await theCatAPI.images.searchImages();
      expect(images).toEqual(response);
    });

    it("should fetch images using limit", async () => {
      const response = imagesResponse.slice(0, 2);
      nock("https://api.thecatapi.com/v1/images")
        .get("/search")
        .query({ limit: /^\d+$/ })
        .reply(200, response);
      const images = await theCatAPI.images.searchImages({
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
      const images = await theCatAPI.images.searchImages({
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
      const images = await theCatAPI.images.searchImages({
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
      const images = await theCatAPI.images.searchImages({
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
      const images = await theCatAPI.images.searchImages({
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
      const images = await theCatAPI.images.searchImages({
        mimeTypes: ["jpg", "png"],
      });
      expect(images).toEqual(response);
    });

    it("should fetch images with pagination", async () => {
      const response = imagesResponse;
      nock("https://api.thecatapi.com/v1/images")
        .get("/search")
        .query({ page: 1, order: "ASC" })
        .reply(200, response);
      const images = await theCatAPI.images.searchImages({
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
      const images = await theCatAPI.images.searchImages({
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
          order: "ASC",
          page: 1,
          sub_id: "USR123",
          mime_types: "jpg",
          has_breeds: 1,
          size: "med",
        })
        .reply(200, response);
      const images = await theCatAPI.images.searchImages({
        limit: 3,
        categories: [1],
        breeds: ["abys"],
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

    it("should fetch an image uploaded by the user fetching it", async () => {
      const response = {
        ...imagesResponse[0],
        vote: {
          id: 604656,
          value: 1,
        },
        favourite: {
          id: 100075345,
        },
      };
      nock("https://api.thecatapi.com/v1/images")
        .get(`/${response.id}`)
        .reply(200, response);
      const image = await theCatAPI.images.getImage(response.id);
      expect(image).toEqual(response);
    });

    it("should fetch an image using subId", async () => {
      const response = imagesResponse[0];
      nock("https://api.thecatapi.com/v1/images")
        .get(`/${response.id}`)
        .query({ sub_id: "fibi" })
        .reply(200, response);
      const image = await theCatAPI.images.getImage(response.id, {
        subId: "fibi",
      });
      expect(image).toEqual(response);
    });

    it("should fetch an image using size", async () => {
      const response = imagesResponse[0];
      nock("https://api.thecatapi.com/v1/images")
        .get(`/${response.id}`)
        .query({ size: "med" })
        .reply(200, response);
      const image = await theCatAPI.images.getImage(response.id, {
        size: "med",
      });
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
          size: "small",
          mime_types: "jpg,png",
        })
        .reply(200, response);
      const image = await theCatAPI.images.getRandomImage({
        hasBreeds: true,
        breeds: ["abys"],
        categories: [1],
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
      expect(uploadedImage).toEqual({
        id: "coDBFem0P",
        url: "https://cdn2.thecatapi.com/images/coDBFem0P.jpg",
        width: 1920,
        height: 1271,
        originalFilename: "cat-1373446292aWW.jpg",
        pending: false,
        approved: true,
        subId: undefined,
      });
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
        "test_subId"
      );
      expect(uploadedImage).toEqual({
        id: "coDBFem0P",
        url: "https://cdn2.thecatapi.com/images/coDBFem0P.jpg",
        width: 1920,
        height: 1271,
        originalFilename: "cat-1373446292aWW.jpg",
        pending: false,
        approved: true,
        subId: "test_subId",
      });
    }, 20000);
  });

  describe("deleteImage", function () {
    it("should fetch an image", async () => {
      nock("https://api.thecatapi.com/v1/images").delete(`/1b`).reply(204);
      await theCatAPI.images.deleteImage("1b");
    });
  });

  describe("getImages", function () {
    it("should fetch uploaded images", async () => {
      const response = [
        {
          breeds: [],
          id: "P5hCKdU2r",
          url: "https://cdn2.thecatapi.com/images/P5hCKdU2r.jpg",
          width: 1420,
          height: 800,
          sub_id: null,
          created_at: "2022-09-23T16:50:51.000Z",
          original_filename: "1478140746024.jpg",
          breed_ids: null,
        },
        {
          breeds: [
            {
              id: "bure",
              name: "Burmese",
            },
          ],
          categories: [
            {
              id: 1,
              name: "hats",
            },
          ],
          id: "dNKC51aCz",
          url: "https://cdn2.thecatapi.com/images/dNKC51aCz.jpg",
          width: 1420,
          height: 800,
          sub_id: "fibi",
          created_at: "2022-09-23T14:01:28.000Z",
          original_filename: "1478140746024.jpg",
          breed_ids: "bure",
          vote: {
            id: 604656,
            value: 1,
          },
          favourite: {
            id: 100075345,
          },
        },
      ];
      nock("https://api.thecatapi.com/v1")
        .get("/images")
        .query({ limit: 5 })
        .reply(200, response);
      const uploadedImages = await theCatAPI.images.getImages({ limit: 5 });
      expect(uploadedImages).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            breeds: [],
            id: "P5hCKdU2r",
            url: "https://cdn2.thecatapi.com/images/P5hCKdU2r.jpg",
            width: 1420,
            height: 800,
            subId: null,
            createdAt: new Date("2022-09-23T16:50:51.000Z"),
            originalFilename: "1478140746024.jpg",
            breedId: null,
          }),
          expect.objectContaining({
            breeds: [
              {
                id: "bure",
                name: "Burmese",
              },
            ],
            categories: [
              {
                id: 1,
                name: "hats",
              },
            ],
            id: "dNKC51aCz",
            url: "https://cdn2.thecatapi.com/images/dNKC51aCz.jpg",
            width: 1420,
            height: 800,
            subId: "fibi",
            createdAt: new Date("2022-09-23T14:01:28.000Z"),
            originalFilename: "1478140746024.jpg",
            breedId: "bure",
            vote: {
              id: 604656,
              value: 1,
            },
            favourite: {
              id: 100075345,
            },
          }),
        ])
      );
    });
    it("should fetch uploaded images using filters", async () => {
      nock("https://api.thecatapi.com/v1")
        .get("/images")
        .query({
          limit: 12,
          sub_id: "fibi123",
          size: "med",
          breed_ids: "abys",
          has_breeds: 1,
          order: "ASC",
          page: 1,
          category_ids: 1,
          mime_types: "jpg,gif",
          original_filename: "1.jpg",
        })
        .reply(200, []);
      const uploadedImages = await theCatAPI.images.getImages({
        limit: 12,
        subId: "fibi123",
        size: "med",
        breeds: ["abys"],
        hasBreeds: true,
        order: "ASC",
        page: 1,
        categories: [1],
        mimeTypes: ["jpg", "gif"],
        originalFilename: "1.jpg",
      });
      expect(uploadedImages).toEqual([]);
    });
  });

  describe("getAnalysis", function () {
    it("should fetch analysis of an image", async () => {
      const response = [
        {
          labels: [
            { Name: "Monk", Confidence: 99.57637023925781 },
            { Name: "Human", Confidence: 99.57637023925781 },
            { Name: "Person", Confidence: 99.57637023925781 },
            { Name: "Cat", Confidence: 88.72314453125 },
            { Name: "Mammal", Confidence: 88.72314453125 },
            { Name: "Animal", Confidence: 88.72314453125 },
            { Name: "Pet", Confidence: 88.72314453125 },
          ],
          moderation_labels: [],
          vendor: "AWS Rekognition",
          image_id: "air",
          created_at: "2018-11-25T07:40:49.000Z",
        },
      ];
      nock("https://api.thecatapi.com/v1/images")
        .get(`/${response[0].image_id}/analysis`)
        .reply(200, response);
      const analysis = await theCatAPI.images.getImageAnalysis("air");
      expect(analysis).toEqual([
        {
          labels: [
            { name: "Monk", confidence: 99.57637023925781 },
            { name: "Human", confidence: 99.57637023925781 },
            { name: "Person", confidence: 99.57637023925781 },
            { name: "Cat", confidence: 88.72314453125 },
            { name: "Mammal", confidence: 88.72314453125 },
            { name: "Animal", confidence: 88.72314453125 },
            { name: "Pet", confidence: 88.72314453125 },
          ],
          moderationLabels: [],
          vendor: "AWS Rekognition",
          imageId: "air",
          createdAt: new Date("2018-11-25T07:40:49.000Z"),
        },
      ]);
    });
    it("should fetch analysis of an image containing instances", async () => {
      const response = [
        {
          labels: [
            { Name: "Person", Confidence: 99.57637023925781 },
            {
              Name: "Cat",
              Confidence: 88.72314453125,
              Instances: [
                {
                  BoundingBox: {
                    Width: 0.8077936768531799,
                    Height: 0.9992132186889648,
                    Left: 0,
                    Top: 0,
                  },
                  Confidence: 96.725830078125,
                },
              ],
            },
          ],
          moderation_labels: [],
          vendor: "AWS Rekognition",
          image_id: "air",
          created_at: "2018-11-25T07:40:49.000Z",
        },
      ];
      nock("https://api.thecatapi.com/v1/images")
        .get(`/${response[0].image_id}/analysis`)
        .reply(200, response);
      const analysis = await theCatAPI.images.getImageAnalysis("air");
      expect(analysis).toEqual([
        {
          labels: [
            { name: "Person", confidence: 99.57637023925781 },
            {
              name: "Cat",
              confidence: 88.72314453125,
              instances: [
                {
                  boundingBox: {
                    width: 0.8077936768531799,
                    height: 0.9992132186889648,
                    left: 0,
                    top: 0,
                  },
                  confidence: 96.725830078125,
                },
              ],
            },
          ],
          moderationLabels: [],
          vendor: "AWS Rekognition",
          imageId: "air",
          createdAt: new Date("2018-11-25T07:40:49.000Z"),
        },
      ]);
    });
    it("should fetch analysis of an image containing parents", async () => {
      const response = [
        {
          labels: [
            {
              Name: "Cat",
              Confidence: 88.72314453125,
              Instances: [],
              Parents: [
                {
                  Name: "Cat",
                },
                {
                  Name: "Pet",
                },
              ],
            },
          ],
          moderation_labels: [],
          vendor: "AWS Rekognition",
          image_id: "air",
          created_at: "2018-11-25T07:40:49.000Z",
        },
      ];
      nock("https://api.thecatapi.com/v1/images")
        .get(`/${response[0].image_id}/analysis`)
        .reply(200, response);
      const analysis = await theCatAPI.images.getImageAnalysis("air");
      expect(analysis).toEqual([
        {
          labels: [
            {
              name: "Cat",
              confidence: 88.72314453125,
              instances: [],
              parents: [
                {
                  name: "Cat",
                },
                {
                  name: "Pet",
                },
              ],
            },
          ],
          moderationLabels: [],
          vendor: "AWS Rekognition",
          imageId: "air",
          createdAt: new Date("2018-11-25T07:40:49.000Z"),
        },
      ]);
    });
  });
});
