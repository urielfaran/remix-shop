import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function seed() {
  console.log("seeding...");

  await Promise.all(
    getUsers().map(async (user) => {
      const { email, name, password } = user;
      const hashedPassword = await bcrypt.hash(password, 10);

      return db.user.upsert({
        where: {
          email: email,
        },
        update: {
          name: name,
          password: hashedPassword,
        },
        create: {
          ...user,
        },
      });
    })
  );

  const categories = [
    {
      name: "fruites",
      image: "/images/fruits/fruits.jpg",
      products: [
        {
          name: "Apple",
          price: 5,
          image: "/images/fruits/apple.webp",
        },
        {
          name: "Appricott",
          price: 5,
          image: "/images/fruits/apricot.jpg",
        },
        {
          name: "Banana",
          price: 5,
          image: "/images/fruits/Banana.webp",
        },
        {
          name: "BlackBerry",
          price: 5,
          image: "/images/fruits/apple.webp",
        },
        {
          name: "Cherry",
          price: 5,
          image: "/images/fruits/apple.webp",
        },
        {
          name: "Cranberry",
          price: 5,
          image: "/images/fruits/apple.webp",
        },
        {
          name: "Date",
          price: 5,
          image: "/images/fruits/apple.webp",
        },
        {
          name: "Dragonfruit",
          price: 5,
          image: "/images/fruits/apple.webp",
        },
        {
          name: "Elderberry",
          price: 5,
          image: "/images/fruits/apple.webp",
        },
        {
          name: "Fig",
          price: 5,
          image: "/images/fruits/apple.webp",
        },
        {
          name: "Grape",
          price: 5,
          image: "/images/fruits/apple.webp",
        },
        {
          name: "Grapefruit",
          price: 5,
          image: "/images/fruits/apple.webp",
        },
      ],
    },
    {
      name: "vegetables",
      image: "/images/vegetables/vegetables.jpeg",
      products: [
        {
          name: "tomato",
          price: 123,
          image: "/images/fruits/apple.webp",
        },
        {
          name: "potato",
          price: 122,
          image: "/images/fruits/apple.webp",
        },
      ],
    },
    {
      name: "Dairy",
      image: "/images/dairy/dairy.jpg",
      products: [
        {
          name: "tomato",
          price: 123,
          image: "/images/fruits/apple.webp",
        },
        {
          name: "potato",
          price: 122,
          image: "/images/fruits/apple.webp",
        },
      ],
    },
    {
      name: "Bread",
      image: "/images/bread/bread.jpg",
      products: [
        {
          name: "tomato",
          price: 123,
          image: "/images/fruits/apple.webp",
        },
        {
          name: "potato",
          price: 122,
          image: "/images/fruits/apple.webp",
        },
      ],
    },
  ];

  await Promise.all(
    categories.map((category) => {
      return db.category.upsert({
        where: { name: category.name },
        update: {
          products: {
            updateMany: category.products.map((product) => ({
              where: {
                name: product.name,
              },
              data: {
                image: product.image,
                price: product.price,
                // buyListId: product.buyListId,
                // categoryId: product.categoryId,
              },
            })),
            createMany: {
              data: category.products,
              skipDuplicates: true,
            },
          },
          image: category.image
        },
        create: {
          name: category.name,
          image: category.image,
          products: {
            createMany: {
              data: category.products,
              skipDuplicates: true,
            },
          },
        },
      });
    })
  );
  console.log("seeded!");
}

seed();

function getUsers(): Prisma.UserCreateInput[] {
  return [
    {
      name: "user1",
      email: "user@gmail.com",
      password: "12345678",
    },
  ];
}
