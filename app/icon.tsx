import { ImageResponse } from 'next/og';
 
// Route segment config
export const runtime = 'edge';
 
// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';
 
// Image generation
export default async function Icon() {
  // Load the profile image
  // Note: In Next.js edge runtime we need to fetch the image
  // We'll use the absolute URL for the deployment
  const profileImageUrl = new URL('../public/images/profile.jpg', import.meta.url);
  const profileImageBuffer = await fetch(profileImageUrl).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 24,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        <img 
            src={profileImageBuffer as any} 
            alt="Profile"
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
            }}
        />
      </div>
    ),
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}
