import Image from "next/image";
import { Text } from "../style";
import { useState } from "react";
import { Button } from './style';

const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <Text
        className=""
        id="password"
        type={showPassword ? 'text' : 'password'}
        name="password"
        placeholder="Your password"
        required
        minLength={6}
      />
      <Button 
        type="button" 
        onClick={() => setShowPassword(!showPassword)}
        className={showPassword ? 'bg-base-200' : 'block'}
      >
        <Image
          src="/show-password.svg"
          alt="Show password" width="24"
          height="20"
        />
      </Button>
    </div>
  )
}

export default PasswordInput;