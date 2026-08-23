import { AlertDialog, Button, Flex } from "@radix-ui/themes";

export function GiveUpAlertDialog({
  onGiveUp,
  disabled,
  isGivingUp,
}: {
  onGiveUp: () => void;
  disabled: boolean;
  isGivingUp: boolean;
}) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button className="grow!" disabled={disabled}>
          استسلام
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content size={"3"} maxWidth="450px">
        <AlertDialog.Title>تأكيد الاستسلام</AlertDialog.Title>
        <AlertDialog.Description>
          الاستسلام سيمنعك من اعادة المحاولة من جديد , هل انت متأكد؟
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              اغلاق
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              loading={isGivingUp}
              onClick={onGiveUp}
              variant="solid"
              color="red"
            >
              {isGivingUp ? "جاري الاستسلام" : "تأكيد"}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
