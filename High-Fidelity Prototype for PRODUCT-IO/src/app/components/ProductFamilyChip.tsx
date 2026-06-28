import { Badge } from "./ui/badge";

export type ProductFamily = "servilletas" | "bolsitas" | "troquelados" | "pajitas" | "vasos";

interface ProductFamilyChipProps {
  family: ProductFamily;
}

const familyConfig = {
  servilletas: {
    label: "Servilletas",
    className: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  },
  bolsitas: {
    label: "Bolsitas",
    className: "bg-green-100 text-green-800 hover:bg-green-200",
  },
  troquelados: {
    label: "Troquelados",
    className: "bg-purple-100 text-purple-800 hover:bg-purple-200",
  },
  pajitas: {
    label: "Pajitas",
    className: "bg-orange-100 text-orange-800 hover:bg-orange-200",
  },
  vasos: {
    label: "Vasos",
    className: "bg-pink-100 text-pink-800 hover:bg-pink-200",
  },
};

export function ProductFamilyChip({ family }: ProductFamilyChipProps) {
  const config = familyConfig[family];
  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}
