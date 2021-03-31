const styles = (theme) => ({
    wrapSeat: {
        textAlign: 'center',
        paddingTop: '40px'
    },
    table: {
        margin: '0 auto',
        borderCollapse: 'unset',
        borderSpacing: '5px'
    },
    seat: {
        fontSize: '13px',
        borderRadius: '5px',
        width: '32px',
        height: '32px',
    },
    normal: {
        backgroundColor: 'lightgray',
        "&:hover": {
            cursor: 'pointer',
            backgroundColor: theme.color.orange,
            transition: '0.5s'
        }
    },
    choosing: {
        backgroundColor: 'lightseagreen',
        "&:hover": {
            cursor: 'pointer',
            backgroundColor: theme.color.orange,
            transition: '0.5s'
        }
    },
    reversed: {
        backgroundColor: '#d26a74',
        "&:hover": {
            cursor: 'not-allowed'
        }
    }
})

export default styles