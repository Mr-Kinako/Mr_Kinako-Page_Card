import styles from './Media.module.scss';

interface MediaProps {
    isDev: boolean;
}

export const Media = ({
    // isDev
}: MediaProps) => {
    return (
        <div className={styles.media}>
            Text
        </div>
    );
};
