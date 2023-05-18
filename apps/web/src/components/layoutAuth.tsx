import AuthProvider from 'lib/auth/AuthProvider';

type Props = {
  preview?: boolean;
  children: React.ReactNode;
  noHeader?: boolean;
  user?: any;
};
const LayoutAuth = ({noHeader, user, children}: Props) => {
  return (
    <>
      <AuthProvider user={user}>
        {!noHeader ? (
          <div className="min-h-screen">
            <main>{children}</main>
          </div>
        ) : (
          children
        )}
      </AuthProvider>
    </>
  );
};

export default LayoutAuth;
