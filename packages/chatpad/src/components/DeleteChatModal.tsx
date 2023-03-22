import {Button, Modal, Stack, Text} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {notifications} from '@mantine/notifications';
import {useRouter} from 'next/router';
import {cloneElement, ReactElement, useState} from 'react';
import {Chat, db} from '../db';
import {useChatId} from '../hooks/useChatId';

export function DeleteChatModal({
  chat,
  children,
}: {
  chat: Chat;
  children: ReactElement;
}) {
  const [opened, {open, close}] = useDisclosure(false);
  const [submitting, setSubmitting] = useState(false);

  const chatId = useChatId();
  const router = useRouter();

  return (
    <>
      {cloneElement(children, {onClick: open})}
      <Modal opened={opened} onClose={close} title="Delete Chat">
        <form
          onSubmit={async (event) => {
            try {
              setSubmitting(true);
              event.preventDefault();
              await db.chats.where({id: chat.id}).delete();
              await db.messages.where({chatId: chat.id}).delete();
              if (chatId === chat.id) {
                router.push('/');
              }
              close();

              notifications.show({
                title: 'Deleted',
                message: 'Chat deleted.',
              });
            } catch (error: any) {
              if (error.message === 'Network Error') {
                notifications.show({
                  title: 'Error',
                  color: 'red',
                  message: 'No internet connection.',
                });
              } else {
                notifications.show({
                  title: 'Error',
                  color: 'red',
                  message:
                    "Can't remove chat. Please refresh the page and try again.",
                });
              }
            } finally {
              setSubmitting(false);
            }
          }}>
          <Stack>
            <Text size="sm">Are you sure you want to delete this chat?</Text>
            <Button type="submit" color="red" loading={submitting}>
              Delete
            </Button>
          </Stack>
        </form>
      </Modal>
    </>
  );
}