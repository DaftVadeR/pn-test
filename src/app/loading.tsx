import { LoadingIndicator } from '../components/elements/loading';

export default function Loading() {
  return (
    <div className='flex flex-col items-center justify-center min-h-full min-w-full'>      
      <LoadingIndicator />
    </div>
  );
}