variable "stack_name" {
  description = "The name of the deployment environment"
  type        = string
}

variable "google_client_id" {
  description = "Client ID for Google OAuth2"
  type        = string
}

variable "google_client_secret" {
  description = "Secret for Google OAuth2"
  type        = string
}

variable "root_domain" {
  description = "Root domain for whole project"
  type        = string
}

variable "cognito_subdomain" {
  description = "Subdomain for cognito"
  type        = string
}
