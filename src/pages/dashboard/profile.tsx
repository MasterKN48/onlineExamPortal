import { useRouteLoaderData } from 'react-router-dom';
import { Button, Heading, Input } from '@/components/ui';

export const Profile = () => {
  const { username } = useRouteLoaderData('dashboard') as {
    username: string;
  };

  return (
    <div>
      <Heading>Your Profile</Heading>
      <p>
        <strong>Username:</strong> {username}
      </p>

      <Heading size="h3">Change Password</Heading>
      <form className="mt-4 space-y-4 max-w-lg">
        <Input label="New Password" id="newPassword" name="newPassword" type="password" required />
        <Input label="Confirm New Password" id="confirmNewPassword" name="confirmNewPassword" type="password" required />
        <Button type="submit">Change Password</Button>
      </form>
    </div>
  );
};
