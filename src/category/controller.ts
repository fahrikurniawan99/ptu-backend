import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { createResponse } from "../helper/response";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export async function getCategoryList(req: Request, res: Response) {
  try {
    const categories = await prisma.operator_category.findMany();
    console.log("categories");
    console.log(categories);
    const message =
      categories.length != 0
        ? "sukses mengambil data kategori."
        : "data tidak di temukan";
    return res.status(StatusCodes.OK).json(
      createResponse({
        message,
        statusCode: StatusCodes.OK,
        data: categories,
      })
    );
  } catch (error: any) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      createResponse({
        message: "gagal mengambil data kategori",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        error: error,
        error_message: error.message,
      })
    );
  }
}

export async function createCategory(req: Request, res: Response) {
  try {
    const payload = req.body;
    if (!payload.name) {
      return res.status(StatusCodes.BAD_REQUEST).json(
        createResponse({
          message: "gagal membuat kategori",
          statusCode: StatusCodes.BAD_REQUEST,
          error: "Request payload missing",
          error_message: "nama kategori di butuhkan",
        })
      );
    }
    if (!payload.slug) {
      return res.status(StatusCodes.BAD_REQUEST).json(
        createResponse({
          message: "gagal membuat kategori",
          statusCode: StatusCodes.BAD_REQUEST,
          error: "Request payload missing",
          error_message: "slug kategori di butuhkan",
        })
      );
    }
    const category = await prisma.operator_category.findUnique({
      where: { slug: payload.slug },
    });
    if (category) {
      return res.status(StatusCodes.BAD_REQUEST).json(
        createResponse({
          message: "gagal membuat kategori",
          statusCode: StatusCodes.BAD_REQUEST,
          error: "Slug not unique",
          error_message: "tidak dapat di proses, slug duplikan",
        })
      );
    }
    await prisma.operator_category.create({
      data: {
        name: payload.name,
        slug: payload.slug,
        icon: payload.icon,
        masterId: Number(payload.master_id),
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
        message: "gagal membuat kategori",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        error: error,
        error_message: error.message,
      })
    );
  }
}

export async function deleteCategory(req: Request, res: Response) {
  try {
    const categoryId = req.params.id;
    const category = await prisma.operator_category.findUnique({
      where: {
        id: Number(categoryId),
      },
    });
    if (!category) {
      return res.status(StatusCodes.BAD_REQUEST).json(
        createResponse({
          message: "gagal menghapus kategori",
          statusCode: StatusCodes.BAD_REQUEST,
          error: "Data not found in database",
          error_message: "data tidak di temukan",
        })
      );
    }
    await prisma.operator_category.delete({
      where: { id: Number(categoryId) },
    });
    return res.status(StatusCodes.OK).json(
      createResponse({
        message: "kategori berhasil di hapus",
        statusCode: StatusCodes.OK,
      })
    );
  } catch (error: any) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      createResponse({
        message: "gagal menghapus kategori",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        error: error,
        error_message: error.message,
      })
    );
  }
}

export async function getDetailCategory(req: Request, res: Response) {
  try {
    const categoryId = req.params.id;
    const category = await prisma.operator_category.findUnique({
      where: {
        id: Number(categoryId),
      },
    });
    if (!category) {
      return res.status(StatusCodes.BAD_REQUEST).json(
        createResponse({
          message: "gagal mengambil detail kategori",
          statusCode: StatusCodes.BAD_REQUEST,
          error: "Data not found in database",
          error_message: "data tidak di temukan",
        })
      );
    }
    return res.status(StatusCodes.OK).json(
      createResponse({
        message: "sukses mendapatkan detail kategori",
        statusCode: StatusCodes.OK,
        data: category,
      })
    );
  } catch (error: any) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      createResponse({
        message: "gagal mengambil detail kategori",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        error: error,
        error_message: error.message,
      })
    );
  }
}

export async function updateCategory(req: Request, res: Response) {
  try {
    const payload = req.body;
    console.log(payload);
    const category = await prisma.operator_category.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!category) {
      return res.status(StatusCodes.BAD_REQUEST).json(
        createResponse({
          message: "gagal update kategori",
          statusCode: StatusCodes.BAD_REQUEST,
          error: "Data not found in database",
          error_message: "data tidak di temukan",
        })
      );
    }

    await prisma.operator_category.update({
      where: {
        id: category.id,
      },
      data: payload,
    });

    return res.status(StatusCodes.OK).json(
      createResponse({
        message: "sukses update kategori",
        statusCode: StatusCodes.OK,
        data: null,
      })
    );
  } catch (error: any) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      createResponse({
        message: "gagal update kategori",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        error: error,
        error_message: error.message,
      })
    );
  }
}
