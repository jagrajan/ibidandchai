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
