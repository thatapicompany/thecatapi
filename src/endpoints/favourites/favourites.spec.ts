import nock from "nock";
import TheCatAPI from "../../index";

describe("Favourites", () => {
  let theCatAPI: TheCatAPI;

  beforeAll(() => {
    theCatAPI = new TheCatAPI("my_api_key");
  });

  describe("getFavourites", () => {
    it("should fetch favourites", async () => {
      const response = [
        {
          id: 100073620,
          user_id: "7xmy56",
          image_id: "3rK7HGo7r",
          sub_id: "my_first_user",
          created_at: "2022-09-21T15:44:32.000Z",
          image: {
            id: "3rK7HGo7r",
            url: "https://cdn2.thecatapi.com/images/3rK7HGo7r.jpg",
          },
        },
        {
          id: 100075311,
          user_id: "7xmy56",
          image_id: "dNKC51aCz",
          sub_id: null,
          created_at: "2022-09-25T09:26:25.000Z",
          image: {
            id: "dNKC51aCz",
            url: "https://cdn2.thecatapi.com/images/dNKC51aCz.jpg",
          },
        },
      ];
      nock("https://api.thecatapi.com/v1/favourites")
        .get("")
        .reply(200, response);
      const favourites = await theCatAPI.favourites.getFavourites();
      expect(favourites).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: 100073620,
            userId: "7xmy56",
            imageId: "3rK7HGo7r",
            subId: "my_first_user",
            createdAt: new Date("2022-09-21T15:44:32.000Z"),
            image: {
              id: "3rK7HGo7r",
              url: "https://cdn2.thecatapi.com/images/3rK7HGo7r.jpg",
            },
          }),
          expect.objectContaining({
            id: 100075311,
            userId: "7xmy56",
            imageId: "dNKC51aCz",
            subId: null,
            createdAt: new Date("2022-09-25T09:26:25.000Z"),
            image: {
              id: "dNKC51aCz",
              url: "https://cdn2.thecatapi.com/images/dNKC51aCz.jpg",
            },
          }),
        ])
      );
    });
    it("should fetch favourites using subId", async () => {
      const response = [
        {
          id: 100073620,
          user_id: "7xmy56",
          image_id: "3rK7HGo7r",
          sub_id: "my_first_user",
          created_at: "2022-09-21T15:44:32.000Z",
          image: {
            id: "3rK7HGo7r",
            url: "https://cdn2.thecatapi.com/images/3rK7HGo7r.jpg",
          },
        },
      ];
      nock("https://api.thecatapi.com/v1/favourites")
        .get("")
        .query({ sub_id: response[0].sub_id })
        .reply(200, response);
      const favourites = await theCatAPI.favourites.getFavourites(
        "my_first_user"
      );
      expect(favourites).toEqual([
        expect.objectContaining({
          id: 100073620,
          userId: "7xmy56",
          imageId: "3rK7HGo7r",
          subId: "my_first_user",
          createdAt: new Date("2022-09-21T15:44:32.000Z"),
          image: {
            id: "3rK7HGo7r",
            url: "https://cdn2.thecatapi.com/images/3rK7HGo7r.jpg",
          },
        }),
      ]);
    });
  });
});
