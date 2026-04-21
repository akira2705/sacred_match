import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

const profileUpdateSchema = z.object({
  // Basic info
  birthDate: z.string().datetime({ offset: true }).optional().nullable(),
  gender: z.enum(["MALE", "FEMALE", "NON_BINARY", "OTHER"]).optional().nullable(),
  bio: z.string().max(1000).optional().nullable(),
  occupation: z.string().max(100).optional().nullable(),
  employer: z.string().max(100).optional().nullable(),
  city: z.string().max(80).optional().nullable(),
  state: z.string().max(80).optional().nullable(),
  heightCm: z.number().int().min(100).max(250).optional().nullable(),
  educationLevel: z.string().max(80).optional().nullable(),
  denomination: z.string().max(80).optional().nullable(),
  maritalIntent: z.string().max(200).optional().nullable(),
  familyInvolvementLevel: z.string().max(80).optional().nullable(),
  ceremonyPreference: z
    .enum(["CUSTOMARY", "CHURCH", "NIKAH", "COURT", "INTERFAITH", "MULTI_TRADITION"])
    .optional()
    .nullable(),
  visibility: z.enum(["EVERYONE", "MATCHES_ONLY", "PRIVATE"]).optional(),

  // Preferences (nested update)
  preferences: z
    .object({
      preferredAgeMin: z.number().int().min(18).max(99).optional().nullable(),
      preferredAgeMax: z.number().int().min(18).max(99).optional().nullable(),
      openToAllEthnicGroups: z.boolean().optional(),
      interfaithOk: z.boolean().optional(),
      minimumEducation: z.string().max(80).optional().nullable(),
    })
    .optional(),

  // Genotype
  genotype: z
    .object({
      genotype: z.enum(["AA", "AS", "AC", "SS", "SC", "UNKNOWN"]).optional(),
      visibility: z.enum(["EVERYONE", "MATCHES_ONLY", "PRIVATE"]).optional(),
      laboratoryName: z.string().max(200).optional().nullable(),
      laboratoryReference: z.string().max(200).optional().nullable(),
      testedAt: z.string().datetime({ offset: true }).optional().nullable(),
    })
    .optional(),
});

// GET /profile — load the current user's profile + onboarding draft
router.get("/", requireAuth, async (request, response, next) => {
  try {
    const userId = request.user!.sub;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        status: true,
        createdAt: true,
        profile: {
          include: {
            ethnicities: { include: { ethnicGroup: { select: { id: true, name: true, region: true } } } },
            religions: { include: { religion: { select: { id: true, name: true } } } },
          },
        },
        preferences: true,
        genotypeInfo: true,
        photos: {
          orderBy: { orderIndex: "asc" },
          select: { id: true, url: true, caption: true, isPrimary: true, orderIndex: true },
        },
        verificationRecords: {
          orderBy: { createdAt: "desc" },
          select: { id: true, type: true, status: true, createdAt: true, verifiedAt: true },
        },
      },
    });

    if (!user) {
      return response.status(404).json({ ok: false, error: "User not found" });
    }

    return response.json({ ok: true, data: user });
  } catch (error) {
    return next(error);
  }
});

// PUT /profile — save / update onboarding profile draft
router.put("/", requireAuth, async (request, response, next) => {
  try {
    const userId = request.user!.sub;
    const payload = profileUpdateSchema.parse(request.body);

    const { preferences, genotype, ...profileData } = payload;

    // Build profile update data
    const profileUpdate: Record<string, unknown> = {};
    const profileKeys: (keyof typeof profileData)[] = [
      "bio", "occupation", "employer", "city", "state", "heightCm",
      "educationLevel", "denomination", "maritalIntent", "familyInvolvementLevel",
      "ceremonyPreference", "visibility", "gender",
    ];
    for (const key of profileKeys) {
      if (key in profileData) profileUpdate[key] = profileData[key as keyof typeof profileData];
    }
    if ("birthDate" in profileData && profileData.birthDate !== undefined) {
      profileUpdate.birthDate = profileData.birthDate ? new Date(profileData.birthDate) : null;
    }

    // Upsert profile
    const updatedProfile = await prisma.userProfile.upsert({
      where: { userId },
      create: { userId, country: "Nigeria", ...profileUpdate },
      update: profileUpdate,
    });

    // Update preferences if provided
    if (preferences) {
      await prisma.userPreference.upsert({
        where: { userId },
        create: { userId, ...preferences },
        update: preferences,
      });
    }

    // Update genotype if provided
    if (genotype) {
      const genotypeUpdate: Record<string, unknown> = {};
      if (genotype.genotype) genotypeUpdate.genotype = genotype.genotype;
      if (genotype.visibility) genotypeUpdate.visibility = genotype.visibility;
      if ("laboratoryName" in genotype) genotypeUpdate.laboratoryName = genotype.laboratoryName;
      if ("laboratoryReference" in genotype) genotypeUpdate.laboratoryReference = genotype.laboratoryReference;
      if ("testedAt" in genotype && genotype.testedAt !== undefined) {
        genotypeUpdate.testedAt = genotype.testedAt ? new Date(genotype.testedAt) : null;
      }

      await prisma.genotypeInfo.upsert({
        where: { userId },
        create: { userId, ...genotypeUpdate },
        update: genotypeUpdate,
      });
    }

    return response.json({
      ok: true,
      message: "Profile updated successfully",
      data: { profileId: updatedProfile.id },
    });
  } catch (error) {
    return next(error);
  }
});

export { router as profileRouter };
