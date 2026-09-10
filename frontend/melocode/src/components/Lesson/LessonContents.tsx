import { Link, Text } from "@radix-ui/themes";
import { SidePanelContainer } from "../shared/ui/SidePanel/SidePanelContainer";
import { SidePanelHeader } from "../shared/ui/SidePanel/SidePanelHeader";
import { SidePanelList } from "../shared/ui/SidePanel/SidePanelList";
import { SidePanelListItem } from "../shared/ui/SidePanel/SidePanelListItem";
import { Link as LinkIcon } from "lucide-react";

export function LessonContents({
  toc,
}: {
  toc: { text: string; slug: string }[];
}) {
  return (
    <SidePanelContainer position="right">
      <SidePanelHeader>
        <Text as="p" className="font-semibold tracking-wider" size={"5"}>
          محتويات الدرس
        </Text>
      </SidePanelHeader>
      <SidePanelList>
        {toc.map((link) => {
          return (
            <SidePanelListItem>
              <Link
                href={link.slug}
                className="flex! gap-1! items-center group text-sm font-medium text-[var(--gray-12)] "
              >
                {link.text}
                <LinkIcon className="group-hover:block hidden" size={18} />
              </Link>
            </SidePanelListItem>
          );
        })}
        <SidePanelListItem>
          <Link
            href={"#الخلاصة"}
            className="flex! gap-1! items-center group text-sm font-medium text-[var(--gray-12)]"
          >
            الخلاصة
            <LinkIcon className="group-hover:block hidden" size={18} />
          </Link>
        </SidePanelListItem>
      </SidePanelList>
    </SidePanelContainer>
  );
}
