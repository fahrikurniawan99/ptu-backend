import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createResponse } from "../helper/response";

const prisma = new PrismaClient();

export async function getPaymentMethodList(req: Request, res: Response) {
  try {
    let condition = {};
    const category = req.query?.category;
    if (category) {
      condition = { categoryId: category };
    }

    const paymentMethods = await prisma.payment_method.findMany({
      where: condition,
    });
    console.log("paymentMethods");
    console.log(paymentMethods);
    const message =
      paymentMethods.length != 0
        ? "sukses mengambil data metode pembayaran."
        : "data tidak di temukan";

    return res.status(StatusCodes.OK).json(
      createResponse({
        message,
        statusCode: StatusCodes.OK,
        data: paymentMethods,
      })
    );
  } catch (error: any) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      createResponse({
        message: "gagal mengambil metode pembayaran.",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        error: error,
        error_message: error.message,
      })
    );
  }
}

export async function createPaymentMethod(req: Request, res: Response) {
  try {
    const payload = req.body;
    const paymentMethod = await prisma.payment_method.findUnique({
      where: { paymentCode: payload.paymentCode },
    });
    if (paymentMethod) {
      return res.status(StatusCodes.BAD_REQUEST).json(
        createResponse({
          message: "gagal membuat metode pembayaran",
          statusCode: StatusCodes.BAD_REQUEST,
          error: "Data duplicate",
          error_message: "kode pembayaran sudah ada.",
        })
      );
    }
    const response = await prisma.payment_method.create({
      data: {
        name: payload.name,
        paymentCode: payload.paymentCode,
        categoryId: payload.categoryId,
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
        message: "gagal membuat metode pembayaran",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        error: error,
        error_message: error.message,
      })
    );
  }
}

export async function deletePaymentMethod(req: Request, res: Response) {
  try {
    const paymentMethodId = req.params.id;
    const paymentMethod = await prisma.payment_method.findFirst({
      where: {
        uuid: paymentMethodId,
      },
    });
    if (!paymentMethod) {
      return res.status(StatusCodes.BAD_REQUEST).json(
        createResponse({
          message: "gagal menghapus metode pembayaran",
          statusCode: StatusCodes.BAD_REQUEST,
          error: "Data not found in database",
          error_message: "data tidak di temukan",
        })
      );
    }
    await prisma.payment_method.delete({
      where: { id: paymentMethod.id },
    });
    return res.status(StatusCodes.OK).json(
      createResponse({
        message: "metode pembayaran berhasil di hapus",
        statusCode: StatusCodes.OK,
      })
    );
  } catch (error: any) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      createResponse({
        message: "gagal menghapus metode pembayaran",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        error: error,
        error_message: error.message,
      })
    );
  }
}
