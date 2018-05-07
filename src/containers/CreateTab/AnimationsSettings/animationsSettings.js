// Animation setting for FlipMove library component

export const customEnterAnimation = {
    from: {
        opacity: 0,
        transform: 'translateX(-100%) scale(.7)'
    },
    to: {
        opacity: 1,
        transform: 'translateX(0) scale(1)'
    }
};

export const customLeaveAnimation = {
    from: {
        opacity: 1,
        transform: 'translateX(0) scale(1)'
    },
    to: {
        opacity: 0,
        transform: 'translateX(100%) scale(.7)'
    }
};
