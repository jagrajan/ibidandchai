terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
  required_version = ">= 0.15.0"
}

provider "aws" {
  region = "us-east-2"
}

provider "aws" {
  region = "us-east-1"
  alias = "us-east-1"
}