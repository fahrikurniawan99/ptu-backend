import { Request, Response } from "express";
import { createResponse } from "../helper/response";
import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProduct = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const product = await prisma.product.findUnique({
      where: {
        productCode: payload.productCode,
      },
    });

    if (product) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
        createResponse({
          message: "gagal memebuat produk",
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          error: "",
          error_message: "data duplikat",
        })
      );
    }

    await prisma.product.create({
      data: {
        operatorId: Number(payload.operatorId),
        price: Number(payload.price),
        masterPrice: Number(payload.masterPrice),
        masterJenisProductId: Number(payload.masterJenisProductId),
        masterProductId: Number(payload.masterProductId),
        name: payload.name,
        productCode: payload.productCode,
      },
    });

    return res.status(StatusCodes.CREATED).json(
      createResponse({
        message: "success",
        statusCode: StatusCodes.CREATED,
        data: payload,
      })
    );
  } catch (error: any) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      createResponse({
        message: "gagal membuat produk",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        error: error,
        error_message: error.message,
      })
    );
  }
};

export const getProductList = async (req: Request, res: Response) => {
  try {
    const operator_id = req.query.operator_id;
    console.log(req.query.operator_id);
    const products = await prisma.product.findMany({
      where: {
        operatorId:
          operator_id !== undefined ? Number(operator_id) : operator_id,
      },
    });
    console.log("products");
    console.log(products);
    const message =
      products.length != 0
        ? "sukses mengambil data produk."
        : "data tidak di temukan";
    return res.status(StatusCodes.OK).json(
      createResponse({
        message,
        statusCode: StatusCodes.OK,
        data: products,
      })
    );
  } catch (error: any) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      createResponse({
        message: "gagal mengambil data produk",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        error: error,
        error_message: error.message,
      })
    );
  }
};

export const getDetailProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const product = await prisma.product.findUnique({
      where: {
        id: Number(productId),
      },
      include: {
        operator: true,
      },
    });
    if (!product) {
      return res.status(StatusCodes.BAD_REQUEST).json(
        createResponse({
          message: "gagal mengambil detail produk",
          statusCode: StatusCodes.BAD_REQUEST,
          error: "Data not found in database",
          error_message: "data tidak di temukan",
        })
      );
    }
    return res.status(StatusCodes.OK).json(
      createResponse({
        message: "sukses mendapatkan detail produk",
        statusCode: StatusCodes.OK,
        data: product,
      })
    );
  } catch (error: any) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      createResponse({
        message: "gagal mengambil detail produk",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        error: error,
        error_message: error.message,
      })
    );
  }
};

export async function deleteProduct(req: Request, res: Response) {
  try {
    const productId = req.params.id;
    const product = await prisma.product.findUnique({
      where: {
        id: Number(productId),
      },
    });
    if (!product) {
      return res.status(StatusCodes.BAD_REQUEST).json(
        createResponse({
          message: "gagal menghapus produk",
          statusCode: StatusCodes.BAD_REQUEST,
          error: "Data not found in database",
          error_message: "data tidak di temukan",
        })
      );
    }
    await prisma.product.delete({
      where: { id: Number(productId) },
    });
    return res.status(StatusCodes.OK).json(
      createResponse({
        message: "produk berhasil di hapus",
        statusCode: StatusCodes.OK,
      })
    );
  } catch (error: any) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      createResponse({
        message: "gagal menghapus produk",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        error: error,
        error_message: error.message,
      })
    );
  }
}
