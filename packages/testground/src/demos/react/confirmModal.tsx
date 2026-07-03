import { Button, confirmModal } from '@any-design/anyui-react';

export default function ConfirmModalDemo() {
  const ask = async () => {
    await confirmModal({
      title: 'Save changes',
      content: 'Your changes will be saved to the cloud.',
      confirmText: 'Save',
    });
  };

  return (
    <div>
      <div className="demo-row">
        <Button type="primary" onClick={ask}>
          click me
        </Button>
      </div>
    </div>
  );
}