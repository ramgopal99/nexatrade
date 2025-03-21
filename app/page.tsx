import UserForm from '@/components/UserForm';
import UserInfo from '@/components/UserInfo';

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">NexaTrade</h1>
      <div className="max-w-4xl mx-auto grid gap-8">
        <UserForm />
        <UserInfo />
      </div>
    </div>
  );
}