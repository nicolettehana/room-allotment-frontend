export const permissions = {
  SAD: {
    canCreatePurchase: true,
    canExportPurchase: true,
    canCreateIssue: true,
    canExportIssue: true,
    canAddItem: true,
    canExportItems: true,
    canAddRate: true,
    canExportRates: true,
    canAddCategory: true,
    canAddYearRange: true,
    canAddFirm: true,
    canExportFirms: true,
    canAddUnit: true,
    canManageApprovedFirms:true,
    canAddFirm: true,
    canEditCategory: true
  },
  PUR: {
    canCreatePurchase: true,
    canExportPurchase: true,
    canExportItems: true,
    canExportRates: true,
    canExportFirms: true
  },
  ISS: {
    canCreateIssue: true,
    canExportIssue: true,
    canExportItems: true,
    canExportRates: true,
    canExportFirms: true
  },
};

export const hasPermission = (role, permission) =>
  permissions[role]?.[permission] ?? false;

