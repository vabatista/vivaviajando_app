
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
export default function GoogleLogin({ setUserFunc }: { setUserFunc: (email: string) => void }) {
    useGoogleOneTapLogin({
        onSuccess: credentialResponse => {
          console.log(credentialResponse);
          if (credentialResponse.credential) {
            const decoded: { email: string } = jwtDecode(credentialResponse.credential as string);
            localStorage.setItem('g-token', credentialResponse.credential);
            setUserFunc(decoded.email);
     
          }
        },
        onError: () => {
          console.log('Login Failed');
        },
        auto_select: true
      });
      return (<></>);
}
