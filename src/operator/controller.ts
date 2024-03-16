import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { createResponse } from "../helper/response";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export async function getOperatorList(req: Request, res: Response) {
  try {
    const operators = await prisma.operator.findMany();
    console.log("operators");
    console.log(operators);
    const message =
      operators.length != 0
        ? "sukses mengambil data operator."
        : "data tidak di temukan";
    return res.status(StatusCodes.OK).json(
      createResponse({
        message,
        statusCode: StatusCodes.OK,
        data: operators,
      })
    );
  } catch (error: any) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      createResponse({
        message: "gagal mengambil data operator",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        error: error,
        error_message: error.message,
      })
    );
  }
}

export async function createOperator(req: Request, res: Response) {
  try {
    const payload = req.body;
    if (!payload.name) {
      return res.status(StatusCodes.BAD_REQUEST).json(
        createResponse({
          message: "gagal membuat operator",
          statusCode: StatusCodes.BAD_REQUEST,
          error: "Request payload missing",
          error_message: "nama operator di butuhkan",
        })
      );
    }
    if (!payload.slug) {
      return res.status(StatusCodes.BAD_REQUEST).json(
        createResponse({
          message: "gagal membuat operator",
          statusCode: StatusCodes.BAD_REQUEST,
          error: "Request payload missing",
          error_message: "slug operator di butuhkan",
        })
      );
    }
    if (!payload.category_id) {
      return res.status(StatusCodes.BAD_REQUEST).json(
        createResponse({
          message: "gagal membuat operator",
          statusCode: StatusCodes.BAD_REQUEST,
          error: "Request payload missing",
          error_message: "kategori id di butuhkan",
        })
      );
    }
    const operator = await prisma.operator.findUnique({
      where: { slug: payload.slug },
    });
    if (operator) {
      return res.status(StatusCodes.BAD_REQUEST).json(
        createResponse({
          message: "gagal membuat operator",
          statusCode: StatusCodes.BAD_REQUEST,
          error: "Slug not unique",
          error_message: "tidak dapat di proses, slug duplikan",
        })
      );
    }
    const response = await prisma.operator.create({
      data: {
        name: payload.name,
        slug: payload.slug,
        categoryId: Number(payload.category_id),
        masterId: Number(payload.master_id),
        thumbnail: payload.thumbnail,
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
        message: "gagal membuat operator",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        error: error,
        error_message: error.message,
      })
    );
  }
}

export async function deleteOperator(req: Request, res: Response) {
  try {
    const operatorId = req.params.id;
    const operator = await prisma.operator.findUnique({
      where: {
        id: Number(operatorId),
      },
    });
    if (!operator) {
      return res.status(StatusCodes.BAD_REQUEST).json(
        createResponse({
          message: "gagal menghapus operator",
          statusCode: StatusCodes.BAD_REQUEST,
          error: "Data not found in database",
          error_message: "data tidak di temukan",
        })
      );
    }
    await prisma.operator.delete({
      where: { id: Number(operatorId) },
    });
    return res.status(StatusCodes.OK).json(
      createResponse({
        message: "operator berhasil di hapus",
        statusCode: StatusCodes.OK,
      })
    );
  } catch (error: any) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      createResponse({
        message: "gagal menghapus operator",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        error: error,
        error_message: error.message,
      })
    );
  }
}

export async function getDetailOperator(req: Request, res: Response) {
  try {
    const operatorId = req.params.id;
    const operator = await prisma.operator.findUnique({
      where: {
        id: Number(operatorId),
      },
      include: {
        category: {
          select: {
            masterId: true,
          },
        },
      },
    });
    if (!operator) {
      return res.status(StatusCodes.BAD_REQUEST).json(
        createResponse({
          message: "gagal mengambil detail operator",
          statusCode: StatusCodes.BAD_REQUEST,
          error: "Data not found in database",
          error_message: "data tidak di temukan",
        })
      );
    }
    return res.status(StatusCodes.OK).json(
      createResponse({
        message: "sukses mendapatkan detail operator",
        statusCode: StatusCodes.OK,
        data: operator,
      })
    );
  } catch (error: any) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      createResponse({
        message: "gagal mengambil detail operator",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        error: error,
        error_message: error.message,
      })
    );
  }
}

export async function updateOperator(req: Request, res: Response) {
  try {
    const payload = req.body;
    const operator = await prisma.operator.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!operator) {
      return res.status(StatusCodes.BAD_REQUEST).json(
        createResponse({
          message: "gagal update operator",
          statusCode: StatusCodes.BAD_REQUEST,
          error: "Data not found in database",
          error_message: "data tidak di temukan",
        })
      );
    }

    await prisma.operator.update({
      where: {
        id: operator.id,
      },
      data: payload,
    });

    return res.status(StatusCodes.OK).json(
      createResponse({
        message: "sukses update operator",
        statusCode: StatusCodes.OK,
        data: null,
      })
    );
  } catch (error: any) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      createResponse({
        message: "gagal update operator",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        error: error,
        error_message: error.message,
      })
    );
  }
}
