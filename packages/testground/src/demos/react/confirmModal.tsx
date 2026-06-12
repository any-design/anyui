import { useState } from 'react';
import { Button, ConfirmModal, confirmModal } from '@any-design/anyui-react';
import type { ConfirmModalType } from '@any-design/anyui-react';

export default function ConfirmModalDemo() {
  const [result, setResult] = useState<boolean | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [applying, setApplying] = useState(false);

  const ask = async (type: ConfirmModalType) => {
    const confirmed = await confirmModal({
      title: type === 'danger' ? 'Delete item' : 'Save changes',
      content:
        type === 'danger'
          ? 'The item will be permanently deleted.'
          : 'Your changes will be saved to the cloud.',
      confirmText: type === 'danger' ? 'Delete' : 'Save',
      type,
    });
    setResult(confirmed);
  };

  const onApply = () => {
    setApplying(true);
    setTimeout(() => {
      setApplying(false);
      setModalVisible(false);
      setResult(true);
    }, 1500);
  };

  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Imperative helper</div>
        <div className="demo-row">
          <Button type="primary" onClick={() => ask('primary')}>
            Confirm
          </Button>
          <Button type="danger" onClick={() => ask('danger')}>
            Danger confirm
          </Button>
          <span>Result: {result === null ? 'none' : String(result)}</span>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Component with loading</div>
        <div className="demo-row">
          <Button onClick={() => setModalVisible(true)}>Open modal</Button>
          <ConfirmModal
            modelValue={modalVisible}
            title="Apply changes"
            content="Applying will restart the service. Continue?"
            confirmText="Apply"
            loading={applying}
            closeOnConfirm={false}
            onUpdateModelValue={setModalVisible}
            onConfirm={onApply}
            onCancel={() => setResult(false)}
          />
        </div>
      </div>
    </div>
  );
}
