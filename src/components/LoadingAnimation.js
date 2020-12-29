﻿import React from 'react';
import { motion } from "framer-motion";

const loadingContainer = {
    width: "2rem",
    height: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

const loadingCircle = {
    display: "block",
    width: "0.5rem",
    height: "0.5rem",
    backgroundColor: "black",
    borderRadius: "0.25rem"
};

const loadingContainerVariants = {
    start: {
        transition: {
            staggerChildren: 0.2
        }
    },
    end: {
        transition: {
            staggerChildren: 0.2
        }
    }
};

const loadingCircleVariants = {
    start: {
        y: "50%"
    },
    end: {
        y: "150%"
    }
};

const loadingCircleTransition = {
    duration: 0.5,
    yoyo: Infinity,
    ease: "easeInOut"
};

export function startAnimation() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            < motion.div
                style={loadingContainer}
                variants={loadingContainerVariants}
                initial="start"
                animate="end"
            >
                <motion.span
                    style={loadingCircle}
                    variants={loadingCircleVariants}
                    transition={loadingCircleTransition}
                />
                <motion.span
                    style={loadingCircle}
                    variants={loadingCircleVariants}
                    transition={loadingCircleTransition}
                />
                <motion.span
                    style={loadingCircle}
                    variants={loadingCircleVariants}
                    transition={loadingCircleTransition}
                />
            </motion.div >
        </div>
    )
}

