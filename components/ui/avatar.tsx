"use client";
import { useEffect, useRef } from 'react';
import useAvatarStore from '@/app/store/avatarStore';
import getUserAvatar from '@/app/services/playerAvatar';
import { AvatarIcon } from '@/components/icons/accounts/avatar-icon';
import style from '@/styles/user.avatar.module.css';
import Image from 'next/image';

interface UserAvatarProps {
    userId: string;
}

const Avatar: React.FC<UserAvatarProps> = ({ userId }: { userId: string }) => {
    const { avatars, setAvatarUrl, errors, setError } = useAvatarStore();
    const debouncedFetchRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (debouncedFetchRef.current) {
            clearTimeout(debouncedFetchRef.current);
        }

        debouncedFetchRef.current = setTimeout(async () => {
            if (!avatars[userId]) {
                try {
                    const url = await getUserAvatar(userId);
                    setAvatarUrl(userId, url);
                } catch (err: any) {
                    setError(userId, err.message);
                }
            }
        }, 300);

        return () => {
            if (debouncedFetchRef.current) {
                clearTimeout(debouncedFetchRef.current);
            }
        };
    }, [userId, avatars, setAvatarUrl, setError]);

    return (
        <div className={style.avatar}>
            {errors[userId] || !avatars[userId] ? <AvatarIcon /> : <Image width={44} height={44} src={avatars[userId]} alt="User Avatar" />}
        </div>
    );
};

export default Avatar;