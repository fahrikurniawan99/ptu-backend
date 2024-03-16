import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createResponse } from "../helper/response";

const prisma = new PrismaClient();

export async function getPaymentMethodCategoryList(
  req: Request,
  res: Response
) {
  try {
    // let condition = {};
    // const category = req.query?.category;
    // if (category) {
    //   condition = { categoryId: category };
    // }

    const paymentMethodsCategory =
      await prisma.payment_method_category.findMany();
    console.log("paymentMethodsCategory");
    console.log(paymentMethodsCategory);
    const message =
      paymentMethodsCategory.length != 0
        ? "sukses mengambil data kategori metode pembayaran."
        : "data tidak di temukan";

    return res.status(StatusCodes.OK).json(
      createResponse({
        message,
        statusCode: StatusCodes.OK,
        data: paymentMethodsCategory,
      })
    );
  } catch (error: any) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      createResponse({
        message: "gagal mengambil kategori metode pembayaran.",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        error: error,
        error_message: error.message,
      })
    );
  }
}
export async function createPaymentMethodCategory(req: Request, res: Response) {
  try {
    const payload = req.body;
    const paymentMethodCategory =
      await prisma.payment_method_category.findFirst({
        where: {
          name: {
            equals: payload.name,
          },
        },
      });
    if (paymentMethodCategory) {
      return res.status(StatusCodes.BAD_REQUEST).json(
        createResponse({
          message: "gagal membuat kategori metode pembayaran",
          statusCode: StatusCodes.BAD_REQUEST,
          error: "Data duplicate",
          error_message: "",
        })
      );
    }
    const response = await prisma.payment_method_category.create({
      data: {
        name: payload.name,
      },
    });
    return res.status(StatusCodes.CREATED).json(
      createResponse({
        message: "success",
        statusCode: StatusCodes.CREATED,
        data: response,
      })
    );
  } catch (error: any) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      createResponse({
        message: "gagal membuat kategori metode pembayaran",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        error: error,
        error_message: error.message,
      })
    );
  }
}

export async function deletePaymentMethodCategory(req: Request, res: Response) {
  try {
    const paymentMethodCategoryId = req.params.id;
    const paymentMethodCategory =
      await prisma.payment_method_category.findUnique({
        where: {
          uuid: paymentMethodCategoryId,
        },
      });
    if (!paymentMethodCategory) {
      return res.status(StatusCodes.BAD_REQUEST).json(
        createResponse({
          message: "gagal menghapus kategori metode pembayaran",
          statusCode: StatusCodes.BAD_REQUEST,
          error: "Data not found in database",
          error_message: "data tidak di temukan",
        })
      );
    }
    await prisma.payment_method_category.delete({
      where: { uuid: paymentMethodCategoryId },
    });
    return res.status(StatusCodes.OK).json(
      createResponse({
        message: "kategori metode pembayaran berhasil di hapus",
        statusCode: StatusCodes.OK,
      })
    );
  } catch (error: any) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      createResponse({
        message: "gagal menghapus kategori metode pembayaran ",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        error: error,
        error_message: error.message,
      })
    );
  }
}
