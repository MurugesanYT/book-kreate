
import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "AI-Powered Writing",
      description:
        "Generate compelling chapters, characters, and storylines with advanced AI assistance.",
      icon: <IconTerminal2 />,
    },
    {
      title: "Ease of use",
      description:
        "Intuitive interface that makes book creation as simple as having a conversation.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Flexible Pricing",
      description:
        "Plans that grow with you. From free starter to professional author tools.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "100% Reliable",
      description: "Your creative work is always safe and accessible when you need it.",
      icon: <IconCloud />,
    },
    {
      title: "Multiple Export Formats",
      description: "Export your finished book in PDF, EPUB, DOCX, and many other formats",
      icon: <IconRouteAltLeft />,
    },
    {
      title: "24/7 Creative Support",
      description:
        "Never get stuck. Our AI is always ready to help overcome writer's block.",
      icon: <IconHelp />,
    },
    {
      title: "Quality Guarantee",
      description:
        "If you're not satisfied with your generated content, regenerate until it's perfect.",
      icon: <IconAdjustmentsBolt />,
    },
    {
      title: "And much more",
      description: "Character development, plot planning, editing assistance, and publishing tools",
      icon: <IconHeart />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
