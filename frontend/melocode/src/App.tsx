import { Button, Flex, Text } from "@radix-ui/themes";
import { ProgressMap } from "./components/ProgressMap/ProgressMap";
import type { Node } from "./components/ProgressMap/MapNode";

const nodes: Node[] = [
  {
    id: 1,
    title: "Introduction to Web Dev.",
    status: "completed",
    slug: "into-web-dev",
  },
  {
    id: 2,
    title: "Motivation and Mindset",
    status: "completed",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 3,
    title: "Motivation and Mindset",
    status: "completed",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 4,
    title: "Motivation and Mindset",
    status: "completed",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 6,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 7,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 8,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 9,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },

  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },

  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "locked",
    slug: "motiviation-and-mind-set",
  },
  {
    id: 5,
    title: "Motivation and Mindset",
    status: "current",
    slug: "motiviation-and-mind-set",
  },
];

function App() {
  return (
    <Flex direction={"column"} align={"start"} gap="2">
      <Text>Hello from Radix Themes :)</Text>
      <Button>Let's go</Button>
      <ProgressMap nodes={nodes} />
    </Flex>
  );
}

export default App;
