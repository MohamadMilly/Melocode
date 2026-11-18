export function getSubmitButtonLabel(flags: {
  areTestCasesLoading: boolean;
  isRunningPending: boolean;
  isSubmitting: boolean;
}) {
  if (flags.areTestCasesLoading) return "جاري تحميل الاختبارات";
  if (flags.isRunningPending) return "يتم تنفيذ الكود";
  if (flags.isSubmitting) return "جاري التحقق";
  return "تحقق من الحل";
}
