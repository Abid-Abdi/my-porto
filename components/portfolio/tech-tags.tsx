import { techTagClassName } from "@/lib/styles";

type TechTagsProps = {
  items: string[];
  label?: string;
};

export function TechTags({ items, label = "Technologies" }: TechTagsProps) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label={label}>
      {items.map((tech) => (
        <li key={tech} className={techTagClassName}>
          {tech}
        </li>
      ))}
    </ul>
  );
}
