import { BarChart3, BookOpen, Code2, Map, Trophy } from "lucide-react";
import AchievementsImage from "../../assests/images/preview/achievements.png";
import AnalyticsImage from "../../assests/images/preview/analytics.png";
import CodeEditorImage from "../../assests/images/preview/code_editor.png";
import LessonImage from "../../assests/images/preview/lesson.png";
import ProgressMapImage from "../../assests/images/preview/progress_map.png";
import type { Feature } from "../types/landing.types";

export const features: Feature[] = [
  {
    icon: BookOpen,
    image: LessonImage,
    title: "دروس واضحة",
    description:
      "محتوى مرتب يبني معرفتك بالتدريج، من المفاهيم الأساسية إلى التطبيق.",
  },
  {
    icon: Code2,
    image: CodeEditorImage,
    title: "تطبيق عملي",
    description: "اختبر فهمك من خلال أسئلة وتحديات برمجية قصيرة بعد كل درس.",
  },
  {
    icon: Trophy,
    image: AchievementsImage,
    title: "إنجازات تحفزك",
    description: "اجمع الشارات وكافئ تقدمك مع أهداف صغيرة تشجعك على الاستمرار.",
  },
  {
    icon: Map,
    image: ProgressMapImage,
    title: "خريطة تعلم واضحة",
    description:
      "اعرف خطوتك التالية وانتقل بين الدروس بثقة دون أن تضيع في الطريق.",
  },
  {
    icon: BarChart3,
    image: AnalyticsImage,
    title: "تحليلات تقدمك",
    description:
      "راجع مستواك وتابع عاداتك التعليمية لتعرف أين تتقدم وأين تحتاج إلى ممارسة أكثر.",
  },
];
