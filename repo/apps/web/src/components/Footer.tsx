"use client";
import React from "react";
import { MarvelLogo } from "ui/server";
import { Button } from "../components/clientComponents";
import Link from "next/link";
import {
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { MdOpenInNew } from "react-icons/md";

const Footer = () => {
  return (
    <div className="w-full bg-p-9 dark:bg-p-1 p-10 flex justify-center pb-40">
      <div className="w-full max-w-5xl flex flex-wrap justify-between gap-5">
        <MarvelLogo className="aspect-square h-40 w-40" />

        <div className="flex flex-wrap gap-5">
          <div className="rounded-lg p-5 bg-p-8 dark:bg-p-2 flex flex-col gap-2 flex-1">
            <h6 className="font-bold">Social Media</h6>
            <Link
              href={"https://in.linkedin.com/company/uvcega"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="text" left={AiFillLinkedin}>
                LinkedIn
              </Button>
            </Link>
            <Link
              href={"https://instagram.com/visionuvce"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="text" left={AiFillInstagram}>
                Instagram
              </Button>
            </Link>
            <Link
              href={"https://twitter.com/marveluvce"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="text" left={AiFillTwitterCircle}>
                Twitter
              </Button>
            </Link>
            <Link
              href={"https://github.com/UVCE-Marvel"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="text" left={AiFillGithub}>
                GitHub
              </Button>
            </Link>
          </div>

          <div className="rounded-lg p-5 bg-p-8 dark:bg-p-2 flex flex-col gap-2 flex-1">
            <h6 className="font-bold">Useful links</h6>
            <Link
              href={"https://uvce.karnataka.gov.in"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="text" right={MdOpenInNew}>
                UVCE
              </Button>
            </Link>
            <Link
              href={"https://uvcega.org"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="text" right={MdOpenInNew}>
                UVCEGA
              </Button>
            </Link>
            <Link
              href={"https://visionuvce.in"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="text" right={MdOpenInNew}>
                Vision UVCE
              </Button>
            </Link>
            <Link
              href={
                "https://podcasts.apple.com/in/podcast/uvce-chronicles/id1532619873"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="text" right={MdOpenInNew}>
                UVCE Chronicles
              </Button>
            </Link>
            <Link
              href={"http://www.visionuvce.in/sampada-shelf/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="text" right={MdOpenInNew}>
                Sampada Shelf
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
